import { Component, OnInit } from '@angular/core';
import { RequestData } from '../../model/requestData/requestData';
import {RequestDataService} from '../../service/request-data.service';
import {TipoOperacion} from '../../model/requestData/tipoOperacion';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import {TipoOperacionEnum,TipoUsuario} from '../../service/request-data.interface'

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent implements OnInit {
  formulario: FormGroup;
  submitted = false;
  tipoOperaciones: TipoOperacion[];
  showNumTarjeta: boolean = true;
  showNumCel: boolean = true;
  showOperador: boolean = true;
  showCodigoUsuario : boolean = true;
  //  requestData: Object ={
  //    operador: "",
  //    tipoOperacion:"",
  //    usuario:""
  //  }
  requestData: RequestData = new RequestData();
 
  usuarios =  [{
    descripcion:"PERSONA NATURAL",valor:"1"}
    ,{descripcion:"PERSONA JURIDICA",valor:"2"}
  ]


  operadores = [{
    nombre:"CLARO",
    valor:"1"
    },{
     nombre:"MOVISTAR",
     valor:"2"
    },{
      nombre:"ENTEL",
      valor:"3"
    },{
      nombre:"BITEL",
      valor:"4"
    }
]

  constructor(
    private requestDataServiceService: RequestDataService,
    private formBuilder: FormBuilder) 
    { }

  ngOnInit() {

    this.requestDataServiceService.getOperacion().subscribe(prueba=>this.tipoOperaciones=prueba);

    this.formulario = this.formBuilder.group({
      numCelular: [null,Validators.required],
      tipoOperacion: [null],
      usuario : [null],
      numTarjeta : [null],
      operador :  [null],
      codigoUsuario: [null]
      
    });
    //this.formulario.patchValue({usuario: '2'}); establecer valor
    this.onChanges();
    this.onChangesTipoUsuario();

  }
  resetar() {
    this.formulario.reset();
  }

  onChangesTipoUsuario(){
    this.formulario.get('usuario').valueChanges
    .subscribe(selectedUsuario => {
        if (selectedUsuario == TipoUsuario.Juridico.valor) {
          
            this.showNumTarjeta = false;  
            this.showCodigoUsuario = true;
            this.formulario.get('numTarjeta').reset(); 
            this.formulario.get('numTarjeta').disable();
           this.formulario.get('codigoUsuario').reset(); 
            this.formulario.get('codigoUsuario').enable();
        }
        else{
          this.showNumTarjeta = true;
          this.showCodigoUsuario = false;
          this.formulario.get('numTarjeta').enable();
          this.formulario.get('codigoUsuario').disable();
          
        }
        
       
    });

  }



  onChanges() {
    
    this.formulario.get('tipoOperacion').valueChanges
    .subscribe(selectedOperacion => {
        if(selectedOperacion == TipoOperacionEnum.ACTIVAR_SMS){
          this.showNumCel = false;
          this.showOperador = false;
          
          this.formulario.get('numCelular').reset();
          this.formulario.get('numCelular').disable();
          this.formulario.get('operador').reset();
          this.formulario.get('operador').disable();

        }
       else if (selectedOperacion == TipoOperacionEnum.CAMBIAR_OPERADOR_CEL) {
         this.showNumCel = true;
         this.showOperador = true;
            this.formulario.get('operador').reset();
            this.formulario.get('operador').enable();
            this.formulario.get('numCelular').enable();
      
            
        }
         else{
          this.showOperador = false;
          this.showNumCel = false;
           this.formulario.get('operador').disable();
           this.formulario.get('numCelular').disable();
         }
         this.requestData.tipoOperacion = this.formulario.get('tipoOperacion').value;
    });
   
}

  newRequestData(): void {
    this.submitted = false;
    this.requestData = new RequestData();
  }

  save() {
    this.estableciendoValores();

    this.requestDataServiceService.sendRequest(this.requestData)
      .subscribe(
        data => {
          console.log(data);
          this.submitted = true;
        },
        error => console.log(error));
       
    this.requestData = new RequestData();
  }

  private estableciendoValores() {
    this.formulario.controls['numCelular'].disable();
    this.requestData.tipoUsuario = this.formulario.get('usuario').value;
    this.requestData.numTarjeta = this.formulario.get('numTarjeta').value;
   // this.requestData.numCelular = this.formulario.get('numCelular').value;
   
    this.requestData.operador = this.formulario.get('operador').value;
  }

  onSubmit() {
    this.save();
  }

}

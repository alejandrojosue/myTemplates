export default class Company {
  constructor(
      public nombre: String,
      public direccion: String,
      public correo: String,
      public telefono: String,
      public website: String,
      public lema: String,
      public CAI: String,
      public RangoInicial: Number,
      public RangoFinal: Number,
      public fechaVencimiento: String,
  ) {}
}
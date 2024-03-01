export interface Producto {
  id?:                 number;
  nombre:             string;
  descripcion?:        string;
  precio:             number;
  imgenUrl?:           string;
  marca?:              Categoria[];
  disponible:         boolean;
  fechaDeLanzamiento: Date;
  categorias?:         Categoria[];
  proveedores?:        Proveedores[];
  tags?:               Tag[];
}

export interface Categoria {
  id?:          number;
  nombre:      string;
  descripcion?: string;
}

export interface Proveedores {
  id?:        number;
  nombre:    string;
  direccion?: string;
  ruc:       string;
  email?:     string;
  telefono?:  string;
  rubros?:    Tag[];
}

export interface Tag {
  id?:     number;
  nombre: string;
}

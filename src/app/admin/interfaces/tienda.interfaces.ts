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

export interface Pagination {
  content:          Proveedores[];
  pageable:         Pageable;
  last:             boolean;
  totalPages:       number;
  totalElements:    number;
  size:             number;
  number:           number;
  sort:             Sort;
  first:            boolean;
  numberOfElements: number;
  empty:            boolean;
}

export interface Pageable {
  sort:       Sort;
  offset:     number;
  pageNumber: number;
  pageSize:   number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  sorted:   boolean;
  unsorted: boolean;
  empty:    boolean;
}


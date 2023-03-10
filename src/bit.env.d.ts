declare module "*.module.css" {
          const classes: { readonly [key: string]: string };
          export default classes;
}

declare module "*.module.scss" {
          const classes: { readonly [key: string]: string };
          export default classes;
}

declare module "*.module.sass" {
          const classes: { readonly [key: string]: string };
          export default classes;
}

declare module "*.jpg" {
          const src: string;
          export default src;
}

declare module "*.png" {
          const src: string;
          export default src;
}

declare module "sweetalert2" {
          export = Swal;
}
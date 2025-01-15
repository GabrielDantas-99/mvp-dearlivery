export const MENU_ITEMS = [
  {
    separator: true,
  },
  {
    label: "Minha Loja",
    items: [
      {
        label: "Visão Geral",
        icon: "pi pi-chart-bar",
        routerLink: "/overview",
        // shortcut: "⌘+N",
      },
      {
        label: "Produtos",
        icon: "pi pi-shop",
        routerLink: "/products",
      },
      {
        label: "Categorias",
        icon: "pi pi-tags",
        routerLink: "/categories",
      },
      {
        label: "Pedidos",
        icon: "pi pi-shopping-bag",
        routerLink: "/orders",
      },
      {
        label: "Clientes",
        icon: "pi pi-users",
        routerLink: "/clients",
      },
    ],
  },
  {
    label: "Perfil",
    items: [
      {
        label: "Configurações",
        icon: "pi pi-sliders-v",
      },
      {
        label: "Mensagens",
        icon: "pi pi-inbox",
        badge: "2",
      },
      {
        label: "Sair",
        icon: "pi pi-sign-out",
      },
    ],
  },
  {
    separator: true,
  },
];

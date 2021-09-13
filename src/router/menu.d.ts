declare namespace Menu {
    interface MenuItem {
        title: string,
        icon: string,
        route: string,
        children?: Array<SubMenuItem>
    }

    interface SubMenuItem {
        title: string,
        route?: string,
        children?: Array<SubMenuLink>
    }

    interface SubMenuLink {
        title: string,
        route: string
    }
}
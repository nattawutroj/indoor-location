import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export default function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <Link href="/protected/maps" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            แผนที่
          </NavigationMenuLink>
        </Link>
        <Link href="/protected/device" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            อุปกรณ์
          </NavigationMenuLink>
        </Link>
        <Link href="/protected/manager" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            ผู้จัดการ
          </NavigationMenuLink>
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

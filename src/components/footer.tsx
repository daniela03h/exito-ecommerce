import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t px-4 bg-gradient-to-r from-secondary/10 to-accent/10">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center justify-center">
            <Image src="/logo-exito.png" alt="Logo" width={100} height={100} />
            <p className="text-sm text-muted-foreground">Para servirte</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Carrito
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Éxito. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

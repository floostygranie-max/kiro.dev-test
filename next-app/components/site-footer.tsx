import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sand-900 text-sand-200 pt-16 pb-6 mt-16">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <Link href="/" className="block mb-4 text-sand-50 font-bold tracking-wide">
            PUSTYNIA BŁĘDOWSKA
            <small className="block text-xs text-sand-400 tracking-wider mt-1">
              POLSKA SAHARA
            </small>
          </Link>
          <p className="text-sm text-sand-300 mb-4">
            Największy obszar lotnych piasków w Europie Środkowej.
          </p>
          <div className="flex gap-2">
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-sun-400 hover:text-sand-900 transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-sun-400 hover:text-sand-900 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="rounded-full bg-white/10 p-2 hover:bg-sun-400 hover:text-sand-900 transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sand-50 text-sm uppercase tracking-widest mb-3">Zwiedzanie</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/cennik" className="hover:text-sun-400">Cennik i bilety</Link></li>
            <li><Link href="/mapa" className="hover:text-sun-400">Mapa i szlaki</Link></li>
            <li><Link href="/wydarzenia" className="hover:text-sun-400">Wydarzenia</Link></li>
            <li><Link href="/galeria" className="hover:text-sun-400">Galeria</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sand-50 text-sm uppercase tracking-widest mb-3">O pustyni</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/polska-sahara" className="hover:text-sun-400">Polska Sahara</Link></li>
            <li><Link href="/aktualnosci" className="hover:text-sun-400">Aktualności</Link></li>
            <li><Link href="/projekty" className="hover:text-sun-400">Projekty</Link></li>
            <li><Link href="/kontakt" className="hover:text-sun-400">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sand-50 text-sm uppercase tracking-widest mb-3">Newsletter</h4>
          <p className="text-sm text-sand-300 mb-2">Otrzymuj info o wydarzeniach.</p>
          <form className="flex rounded-full bg-white/10 p-1">
            <input
              type="email"
              placeholder="Twój email"
              className="flex-1 bg-transparent border-none px-3 py-1.5 text-sm text-sand-50 placeholder:text-sand-400 focus:outline-none"
            />
            <button className="rounded-full bg-sun-400 px-3 py-1.5 text-xs font-bold text-sand-900 hover:bg-sun-500 hover:text-white transition-colors">
              Zapisz
            </button>
          </form>
          <p className="text-xs text-sand-300 mt-3">
            📍 Klucze, woj. małopolskie<br />
            📞 +48 32 642 03 02
          </p>
        </div>
      </div>

      <div className="container border-t border-white/10 pt-5 flex flex-wrap justify-between gap-3 text-xs text-sand-400">
        <span>© {year} Pustynia Błędowska. Wszelkie prawa zastrzeżone.</span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-sun-400">Polityka prywatności</Link>
          <Link href="#" className="hover:text-sun-400">Regulamin</Link>
          <Link href="/admin/login" className="hover:text-sun-400">Panel administratora</Link>
        </div>
      </div>
    </footer>
  );
}

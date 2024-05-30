/** Core */
import Link from 'next/link';

/** Components */
import { LogoImage } from '../ui/logo-image';

export function HeaderLogo() {
  return (
    <Link href="/">
      <div className="hidden items-center lg:flex">
        <LogoImage height={28} width={28} />

        <p className="ml-2.5 text-2xl font-semibold text-white">
          Finance
        </p>
      </div>
    </Link>
  );
}

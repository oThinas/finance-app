/** Core */
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';

/** Components */
import { Header } from '.';
import { LoadSpin } from '../ui/load-spin';

export function HeaderRoot() {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 pb-36 lg:px-14">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-14 flex w-full items-center justify-between">
          <div className="flex items-center lg:gap-x-16">
            <Header.Logo />

            <Header.Navigation />
          </div>

          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>

          <ClerkLoading>
            <LoadSpin className="size-8 text-slate-400" />
          </ClerkLoading>
        </div>

        <Header.WelcomeMessage />
      </div>
    </header>
  );
}

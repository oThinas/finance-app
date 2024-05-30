/** Core */
import Image from 'next/image';

interface LogoImageProps {
  width: number;
  height: number;
}

export function LogoImage(props: LogoImageProps) {
  return (
    <Image
      alt="Um conjunto de nove pontos brancos dispostos em um quadrado"
      src="/logo.svg" width={props.width} height={props.height}
    />
  );
}

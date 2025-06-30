import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { tv } from 'tailwind-variants';
import Title from '../texts/Title.tsx';
import { StyleSystemProps } from '../types.ts';

interface Props extends StyleSystemProps {
  title?: string;
  isDetailed?: boolean;
  children?: React.ReactNode;
  status?: 'pending' | 'success' | 'error';
  backPage?: string;
  headerExtension?: React.ReactNode;
}

const backButtonStyle = tv({
  base: 'min-w-[40px] min-h-[40px] flex justify-center items-center rounded-full cursor-pointer',
  variants: {
    state: {
      default: 'bg-gray-100 text-gray-500 hover:bg-gray-200',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

const containerStyle = tv({
  base: 'gap-3 items-center mb-4',
  variants: {
    size: {
      sm: 'p-4',
      md: 'p-8',
      lg: 'p-10',
      xl: 'p-12',
    },
    colorSchema: {
      primary: 'bg-white',
      secondary: 'bg-gray-100 ',
      brand_primary: 'bg-brand_primary-100',
      brand_secondary: 'bg-brand_secondary-100',
    },
  },
  defaultVariants: {
    size: 'xl',
    colorSchema: 'primary',
  },
});

function PageLayout({
  title,
  children,
  isDetailed,
  status,
  backPage,
  size = 'xl',
  colorSchema = 'primary',
  headerExtension,
}: Props) {
  const navigate = useNavigate();

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error occurred.</div>;

  return (
    <section className={containerStyle({ size, colorSchema })}>
      <nav className="flex gap-3 items-center justify-between">
        <div className="flex gap-3 items-center">
          {isDetailed && (
            <div
              onClick={() => navigate(backPage || -1)}
              className={backButtonStyle()}
            >
              <BiArrowBack size={20} />
            </div>
          )}
          {title && <Title size="lg">{title}</Title>}
        </div>
        <div>{headerExtension}</div>
      </nav>
      <div>{children}</div>
    </section>
  );
}

export default PageLayout;

import { tv } from 'tailwind-variants';
import FormContainer from './FormContainer.tsx';

export type FormItem = {
  id: string | number;
  title: string;
  description: string;
  disabled?: boolean;
};

export type FormItemPickerProps<T> = {
  inputs: (T & FormItem)[];
  onChange: (id: string | number) => void;
  value: string | number;
  children?: (item: T & FormItem, active : boolean) => React.ReactNode;
  label?: string
};

const itemWrapper = tv({
  base: 'cursor-pointer p-4 py-7 w-full justify-center items-center rounded-lg relative border-2 border-solid',
  variants: {
    selected: {
      true: 'border-brand_primary-500 bg-brand_primary-100',
      false: 'border-gray-300 bg-gray-100',
    },
    disabled: {
      true: "opacity-50 !cursor-not-allowed",
      false: ""
    }
  },
});

const indicator = tv({
  base: 'w-[20px] h-[20px] border-[1px] border-solid absolute top-0 left-0 rounded-full m-3 flex items-center justify-center',
  variants: {
    selected: {
      true: 'bg-brand_primary-700 border-brand_primary-500',
      false: 'border-gray-300',
    },
  },
});

const titleStyle = tv({
  base: 'text-sm',
  variants: {
    selected: {
      true: 'text-brand_primary-700',
      false: 'text-gray-800',
    },
  },
});

export default function FormItemPicker<T>({ inputs, onChange, value, children, label}: FormItemPickerProps<T>) {
  return (
    <div className="flex flex-col gap-2 h-full">
      {
        label && <label className="font-semibold text-gray-600 text-sm">{label}</label>
      }
          <div className="grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
            {inputs.map((input) => (
              <div
                key={input.id}
                onClick={() => !input.disabled ? onChange(input.id) : ""}
                className={itemWrapper({ selected: value === input.id, disabled: input.disabled })}
              >
                <div className={indicator({ selected: value === input.id })}>
                  {value === input.id && <div className="w-[10px] h-[10px] rounded-full bg-white"></div>}
                </div>
                <div className="flex gap-1 w-full text-center items-center justify-center mt-3">
                  <p className={titleStyle({ selected: value === input.id })}>{input.title}</p>
                </div>
                <p className="text-xs mt-3 text-center text-gray-500">
                  {input.description}
                </p>
                {
                  children && children(input, value === input.id)
                }
              </div>
            ))}
          </div>
    </div>
  );
}

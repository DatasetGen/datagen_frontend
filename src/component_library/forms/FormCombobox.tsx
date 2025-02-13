import {
  Combobox,
  createListCollection,
  useCombobox,
  UseComboboxProps,
} from '@ark-ui/react/combobox';
import { Portal } from "@ark-ui/react/portal";
import FormContainer, { FormContainerProps } from './FormContainer.tsx';
import { BiCheck } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { useMemo } from 'react';

export interface FormComboBoxProps<T> extends FormContainerProps<HTMLInputElement>{
  options: {label: string, value: number, item: T}[]
  menuLabel: string,
  customTagElement?: (value : T, deleteItem: () => void) => React.ReactNode,
  customMenuElement?: (value : T) => React.ReactNode,
  config?: Omit<UseComboboxProps<string>, 'collection'>
}


function FormCombobox<T>({ options, menuLabel, customTagElement, customMenuElement, config, ...props }: FormComboBoxProps<T>) {
  const collection = useMemo(() => createListCollection({ items: options }), [options])
  const combobox = useCombobox({
    ...config,
    collection: collection,
  });

  return (
    <Combobox.RootProvider value={combobox}>
      <Combobox.Control>
        <FormContainer {...props}>
          {
            (props) => (
              <>
                <Combobox.Input  {...props} />
                <div className="flex gap-1">
                  <Combobox.Trigger className="px-2 font-semibold text-xs">Opciones</Combobox.Trigger>
                  <Combobox.ClearTrigger className="font-semibold text-xs">Clear</Combobox.ClearTrigger>
                </div>
              </>
            )
          }
        </FormContainer>
      </Combobox.Control>
      <div className="flex gap-1 mt-2">{
        combobox.value.map(x => (
          customTagElement ?
            customTagElement(collection.items.find(y => y.value === x).item, () => combobox.setValue(combobox.value.filter(y => y != x)))
            :
          <div
            key={x}
            className="bg-gray-100 py-1 group-focus-within:!bg-white  text-gray-600 border-2 border-solid border-gray-200 px-3 rounded-lg flex items-center text-xs font-semibold gap-2">
            {
              collection?.items?.find(y => y.value === x).label
            }
            <MdClose className="cursor-pointer" size={13}
                     onClick={() => combobox.setValue(combobox.value.filter(y => y != x))}></MdClose>
          </div>
        ))
      }</div>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content className="z-[130] shadow bg-white p-3 rounded-lg">
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel className="mb-2 font-semibold text-gray-800 text-sm">{menuLabel}</Combobox.ItemGroupLabel>
              {collection.items.filter(x => x.label.toLowerCase().includes(combobox.inputValue.toLowerCase())).map((item) => (
                customMenuElement ?
                  <Combobox.Item key={item.value} item={item} asChild>
                    {
                      customMenuElement(item.item)
                    }
                  </Combobox.Item>
                :
                <Combobox.Item key={item.value} item={item} className="w-full flex py-2 px-4 cursor-pointer rounded-lg hover:bg-gray-100  items-center justify-between">
                  <Combobox.ItemText className="text-gray-700 text-sm font-semibold">{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator className="text-brand_primary-800"><BiCheck></BiCheck></Combobox.ItemIndicator>
                </Combobox.Item>
              ))}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.RootProvider>
  )
}

export default FormCombobox;

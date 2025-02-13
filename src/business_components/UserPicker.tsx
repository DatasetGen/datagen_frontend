import React from 'react';
import FormikCombobox from '../component_library/formik/FormikCombobox.tsx';
import { Avatar, Combobox } from '@ark-ui/react';
import { MdClose } from 'react-icons/md';
import { useUsers } from '../api/app/datasets.ts';
import { BiCheck } from 'react-icons/bi';

function UserPicker({name}: {name: string}) {

  const {data, status} = useUsers()()
  if(status !== "success") return "loading..."
  return (
    <FormikCombobox
      config={{
        multiple: true,
        openOnClick: true
      }}
      customTagElement={(value, deleteItem) => (
        <div key={value.id} className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-lg text-xs border-2 font-semibold text-gray-700">
          <Avatar.Root className="bg-gray-200 w-[22px] h-[22px] flex justify-center items-center rounded-full overflow-hidden">
            <Avatar.Fallback className="text-[10px]">{value.first_name[0]}{value.last_name[0]}</Avatar.Fallback>
            <Avatar.Image src={value.avatar} alt="avatar" />
          </Avatar.Root>
          {
            value.first_name
          }
          <MdClose className="cursor-pointer text-sm" onClick={() => deleteItem()}></MdClose>
        </div>
      )}
      customMenuElement={(value) => (
        <div
          key={value.id}
          className="flex justify-between items-center gap-2 px-2 py-3 hover:bg-gray-100 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <Avatar.Root
              className="bg-gray-200 w-[35px] h-[35px] flex justify-center items-center rounded-full overflow-hidden">
              <Avatar.Fallback
                className="text-[10px]">{value.first_name[0]}{value.last_name[0]}</Avatar.Fallback>
              <Avatar.Image src={value.avatar} alt="avatar" />
            </Avatar.Root>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {
                  value.first_name + " " + value.last_name
                }
              </p>
              <p className="text-[11px] text-gray-500">
                {
                  value.email
                }
              </p>
            </div>
          </div>
          <Combobox.ItemIndicator
            className="text-brand_primary-800 text-lg"><BiCheck></BiCheck></Combobox.ItemIndicator>

        </div>
      )}
      menuLabel="Users"
      size="md"
      options={data.map(x => ({
        label: x.first_name + " " + x.last_name,
        value: x.id,
        item: x
      }))} placeholder="Add team members" name={name} label="Assignee"></FormikCombobox>
  );
}

export default UserPicker;
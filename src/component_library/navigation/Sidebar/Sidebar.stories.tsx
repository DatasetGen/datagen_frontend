import type { Meta } from '@storybook/react';
import Logo from '../../../assets/datagenLogo.png'
import { Sidebar } from './index.ts';
import {BiCog, BiData, BiHome} from "react-icons/bi";
import {BrowserRouter} from "react-router";


const options = [
    {
        label : "Home",
        icon : <BiHome></BiHome>,
        path: "/home"
    },
    {
        label : "Datasets",
        icon : <BiData></BiData>,
        path: "/datasets"
    },
    {
        label : "Configuration",
        icon : <BiCog></BiCog>,
        path: "/configuration",
        isBottom: true
    },
]

const meta = {
  component: () => (
      <Sidebar.Wrapper>
        <Sidebar.Bar logoImg={Logo} elements={options}>
        </Sidebar.Bar>
        <Sidebar.Content>
          hola
        </Sidebar.Content>
      </Sidebar.Wrapper>
  ),
  decorators: (Slot) => (
      <BrowserRouter>
          <Slot></Slot>
      </BrowserRouter>
  )
} satisfies Meta<typeof Sidebar.Bar>;

export default meta;
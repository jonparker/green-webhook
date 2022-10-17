import type { ComponentMeta, ComponentStory } from '@storybook/react'

import DefaultLayout from './DefaultLayout'

export const generated: ComponentStory<typeof DefaultLayout> = (args) => {
  return <DefaultLayout {...args} />
}

export default {
  title: 'Layouts/DefaultLayout',
  component: DefaultLayout,
} as ComponentMeta<typeof DefaultLayout>

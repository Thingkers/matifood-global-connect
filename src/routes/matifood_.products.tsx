import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/matifood_/products')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/matifood_/products"!</div>
}

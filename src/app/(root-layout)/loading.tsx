import { LoaderCircle } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <LoaderCircle size={40} className="animate-spin" />
    </div>
  )
}

export default Loading

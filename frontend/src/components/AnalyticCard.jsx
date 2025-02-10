
const AnalyticCard = ({title, total, icon:Icon}) => {
  return (
    <div className='w-full max-h-25 flex items-center justify-between bg-gradient-to-r from-emerald-700 to-emerald-800 p-5 rounded-md overflow-hidden'>
        <div className='flex flex-col'>
            <p className='text-emerald-300 font-medium text-xs sm:text-sm'>
                {title}
            </p>
            <p className='text-white font-medium text-xl sm:text-3xl'>
                {total}
            </p>
        </div>

        <Icon className='size-10 sm:size-20 text-emerald-500' />
    </div>
  )
}

export default AnalyticCard
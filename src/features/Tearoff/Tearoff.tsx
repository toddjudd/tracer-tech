// eslint-disable-next-line import/no-unresolved
import { Spinner } from '@/components/Elements';

import { useCurrentEpoch } from './api/getCurrentEpoch';

import '@/assets/weather-icons/css/weather-icons.min.css';

export const Tearoff = () => {
  const { isLoading, data: epoch } = useCurrentEpoch();

  if (isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!epoch) return null;

  return (
    <div className='grid grid-cols-[auto_3fr] grid-rows-3'>
      <div className='row-span-full min-w-[120px] border-slate-600 border-r-2 '>
        <div className='bg-red-700 text-white text-center text-xl p-2'>
          {epoch.timespan_name}
        </div>
        <div className='text-6xl text-center'>{epoch.day}</div>
        <div className='text-sm'>{epoch.year_day}</div>
      </div>
      <div className='text-center text-2xl'>{epoch.week_day_name}</div>
      <div className='flex justify-center items-center'>
        {epoch?.moons?.map((m, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: m.svg }} />
        ))}
        <div className='weather'>
          <i className={epoch.weather.weather_icon_class}></i>
        </div>
      </div>
      <div className=' text-center'>{epoch.events[0].name}</div>
    </div>
  );
};

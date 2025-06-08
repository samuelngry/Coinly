import { useRive } from '@rive-app/react-canvas';
import monster from '../../assets/monster.riv';

const RivePet = () => {
    const { RiveComponent } = useRive({
        src: monster,
        animations: ['Timeline 1'],
        autoplay: true
    });

    return (
        <div className='flex justify-center'>
            <RiveComponent style={{ width: 250, height: 250 }} />
        </div>
    )
}

export default RivePet

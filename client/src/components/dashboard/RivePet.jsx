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
            <RiveComponent style={{ width: 300, height: 300 }} />
        </div>
    )
}

export default RivePet

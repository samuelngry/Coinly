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
            <RiveComponent style={{ width: 275, height: 275 }}/>
        </div>
    )
}

export default RivePet

import { useRive } from '@rive-app/react-canvas';
import petAnimation from '../../assets/shark.riv';

const PetDisplay = () => {
    const { RiveComponent } = useRive({
        src: petAnimation,
        autoplay: true,
    });

    return (
        <div>
            <RiveComponent />
        </div>
    )
}

export default PetDisplay

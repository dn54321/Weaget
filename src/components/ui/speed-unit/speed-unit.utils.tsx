
import * as math from '@src/utils/math';
import { useSettingStore } from '@src/hooks/stores/use-setting-store';
import { convertMeasurement, getSymbol } from '@components/ui/__tests__/speed-unit.spec';

interface MeasurementUnitProps {
    decimals?: number;
    symbol?: boolean;
    value: number;
}

export default function SpeedUnit(props: MeasurementUnitProps) {
    const round = props.decimals ?? 1;
    const symbol = props.symbol ?? true;
    const measurementSystem = useSettingStore(state => state.measurementScale);
    return (
    <>
        {math.round(convertMeasurement(props.value, measurementSystem), round)}
        {symbol && getSymbol(measurementSystem)}
    </>
    )
}
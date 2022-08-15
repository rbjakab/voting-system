import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type Props = {
    labelArray: string[];
    colorArray: string[];
    numberArray: number[];
};

export const Donut = ({ labelArray, colorArray, numberArray }: Props) => {
    const data = {
        labels: labelArray,
        datasets: [
            {
                data: numberArray,
                backgroundColor: colorArray,
                borderColor: colorArray,
                borderWidth: 1,
            },
        ],
    };

    return (
        <Doughnut
            data={data}
            options={{
                plugins: {
                    title: {
                        display: true,
                        position: 'top',
                        align: 'center',
                        text: 'Current Results of the PM Election',
                    },
                },
            }}
        />
    );
};

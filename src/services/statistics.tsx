import axios from "axios";
import { AppConfigs } from "../config";
import { appDatabase } from './database';
import moment from 'moment';
import { StatisticsData as StatisticsData } from "./models/StatisticsData";

class StatisticsService {

    private static headers = {
        'Content-Type': 'application/json',
        'Authorization': ''
    }

    public static async GetMonthlyStats() {
        return StatisticsService.GetTimeStats('YYYY-MM');
    }

    public static GetDailyStats() {
        return StatisticsService.GetTimeStats('YYYY-MM-DD');
    }

    private static async GetTimeStats(format: string) {
        let startDate = new Date();

        if(format.length == 7) {
            startDate.setDate(startDate.getDate() - 5);
        }

        if(format.length == 10) {
            startDate.setMonth(startDate.getMonth() - 5);
        }

        let prices = await appDatabase
            .prices
            .where('created_at')
            .above(startDate)
            .toArray();

        let group = prices.reduce((group, element) => {
            const month = moment(element.created_at).format(format);
            const index = group.findIndex((s: StatisticsData) => {
                const myMonth = moment(s.key).format(format);
                return myMonth == month;
            });

            if (index == -1) {
                group.push({ key: month, amount: element.amount } as StatisticsData);
            }
            else {
                group[index].amount += element.amount;
            }

            return group;
        }, [] as StatisticsData[]);

        return group;
    }

    public static async GetDetails(time: string) {

        let startDate: Date = new Date();
        let endDate: Date = new Date();
        
        startDate.setFullYear(parseInt(time.substring(0, 4)));
        endDate.setFullYear(parseInt(time.substring(0, 4)));

        startDate.setMonth(parseInt(time.substring(5, 7)) - 1);
        endDate.setMonth(parseInt(time.substring(5, 7)) - 1);

        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        endDate.setHours(0);
        endDate.setMinutes(0);
        endDate.setSeconds(0);

        if(time.length == 7) {
            startDate.setDate(1);
            endDate.setMonth(endDate.getMonth() + 1);
            endDate.setDate(1);
        }

        if(time.length == 10) {
            let day = parseInt(time.substring(8, 10));
            startDate.setDate(day);
            endDate.setDate(day + 1);
        }

        let prices = await appDatabase
            .prices
            .where('created_at')
            .between(startDate, endDate, true, false)
            .toArray();

        let group = prices.reduce((group, element) => {
            const product = element.product_name;
            const index = group.findIndex((s: StatisticsData) => {
                const myProduct = s.key;
                return myProduct == product;
            });

            if (index == -1) {
                group.push({ key: product, amount: element.amount } as StatisticsData);
            }
            else {
                group[index].amount += element.amount;
            }

            return group;
        }, [] as StatisticsData[]);

        return group;
    }
}

export default StatisticsService;
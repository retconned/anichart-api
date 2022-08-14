import moment from "moment";
import axios from "axios";
import express, { Application, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

type FormatedEntry = {
    id: number;
    episode: number;
    airingAt: string;
    media: {
        id: number;
        title: {
            romaji: string;
            native?: string;
            english?: string;
        };
        siteUrl: string;
        episodes: number;
        source: string;
        description: string;
        coverImage: {
            extraLarge: string;
            color: string;
        };
    };
};

const app: Application = express();
const port = 3000;

// fetch data from anilist api

async function fetchData(
    pageNumber: number,
    weekStart: number,
    weekEnd: number
): Promise<any> {
    try {
        const query = `
  {
    Page(page:${pageNumber} ) {
       pageInfo {
        hasNextPage
      }
      airingSchedules(airingAt_greater: ${weekStart}, airingAt_lesser: ${weekEnd}) {
        id
        episode
        airingAt
        media {
          id
          title {
            romaji
            native
            english
          }
          status
          format
          episodes
          source(version: 2)
          siteUrl
          description
          bannerImage
          coverImage {
            extraLarge
            color
          }
        }
      }
    }
  }
    `;
        const response = await axios.post("https://graphql.anilist.co/", {
            query: query,
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

// core logic for sorting and formatting data

async function scheduleFunc(weekStart: number, weekEnd: number): Promise<any> {
    let finalArray: any = [];

    let saturdaySchedule: FormatedEntry[] = [];
    let sundaySchedule: FormatedEntry[] = [];
    let mondaySchedule: FormatedEntry[] = [];
    let tuesdaySchedule: FormatedEntry[] = [];
    let thursdaySchedule: FormatedEntry[] = [];
    let wednesdaySchedule: FormatedEntry[] = [];
    let fridaySchedule: FormatedEntry[] = [];
    try {
        var x = 0;
        var test = await fetchData(x, weekStart, weekEnd);
        var checkNextPage = test.data.Page.pageInfo.hasNextPage;
        do {
            finalArray = [...finalArray, ...test.data.Page.airingSchedules];
            if (checkNextPage) {
                x++;
            }
            test = await fetchData(x, weekStart, weekEnd);
            checkNextPage = test.data.Page.pageInfo.hasNextPage;
        } while (checkNextPage);

        // for each loop to generate the schedule for each day

        for (let i = 0; i < finalArray.length; i++) {
            const entry = finalArray[i];
            const airingDate = entry.airingAt;
            var myDate = new Date(airingDate * 1000);
            var momentDate = moment(myDate).format("dddd");
            const formatedEntry: FormatedEntry = {
                id: entry.id,
                episode: entry.episode,
                airingAt: entry.airingAt,
                media: {
                    id: entry.media.id,
                    title: {
                        romaji: entry.media.title.romaji,
                        native: entry.media.title.native,
                        english: entry.media.title.english,
                    },
                    siteUrl: entry.media.siteUrl,
                    episodes: entry.media.episodes,
                    source: entry.media.source,
                    description: entry.media.description,
                    coverImage: {
                        extraLarge: entry.media.coverImage.extraLarge,
                        color: entry.media.coverImage.color,
                    },
                },
            };

            // sorting days and deleting duplicates

            switch (momentDate) {
                case "Saturday":
                    if (saturdaySchedule.length === 0) {
                        saturdaySchedule.push(formatedEntry);
                    } else {
                        for (let j = 0; j < saturdaySchedule.length; j++) {
                            const element = saturdaySchedule[j];
                            if (element.media.id === formatedEntry.media.id) {
                                break;
                            } else if (j === saturdaySchedule.length - 1) {
                                saturdaySchedule.push(formatedEntry);
                            }
                        }
                    }
                    break;
                case "Sunday":
                    if (sundaySchedule.length === 0) {
                        sundaySchedule.push(formatedEntry);
                    } else {
                        for (let j = 0; j < sundaySchedule.length; j++) {
                            const element = sundaySchedule[j];
                            if (element.media.id === formatedEntry.media.id) {
                                break;
                            } else if (j === sundaySchedule.length - 1) {
                                sundaySchedule.push(formatedEntry);
                            }
                        }
                    }
                    break;
                case "Monday":
                    if (mondaySchedule.length === 0) {
                        mondaySchedule.push(formatedEntry);
                    } else {
                        for (let j = 0; j < mondaySchedule.length; j++) {
                            const element = mondaySchedule[j];
                            if (element.media.id === formatedEntry.media.id) {
                                break;
                            } else if (j === mondaySchedule.length - 1) {
                                mondaySchedule.push(formatedEntry);
                            }
                        }
                    }
                    break;
                case "Tuesday":
                    if (tuesdaySchedule.length === 0) {
                        tuesdaySchedule.push(formatedEntry);
                    } else {
                        for (let j = 0; j < tuesdaySchedule.length; j++) {
                            const element = tuesdaySchedule[j];
                            if (element.media.id === formatedEntry.media.id) {
                                break;
                            } else if (j === tuesdaySchedule.length - 1) {
                                tuesdaySchedule.push(formatedEntry);
                            }
                        }
                    }
                    break;
                case "Wednesday":
                    if (wednesdaySchedule.length === 0) {
                        wednesdaySchedule.push(formatedEntry);
                    } else {
                        for (let j = 0; j < wednesdaySchedule.length; j++) {
                            const element = wednesdaySchedule[j];
                            if (element.media.id === formatedEntry.media.id) {
                                break;
                            } else if (j === wednesdaySchedule.length - 1) {
                                wednesdaySchedule.push(formatedEntry);
                            }
                        }
                    }
                    break;
                case "Thursday":
                    if (thursdaySchedule.length === 0) {
                        thursdaySchedule.push(formatedEntry);
                    } else {
                        for (let j = 0; j < thursdaySchedule.length; j++) {
                            const element = thursdaySchedule[j];
                            if (element.media.id === formatedEntry.media.id) {
                                break;
                            } else if (j === thursdaySchedule.length - 1) {
                                thursdaySchedule.push(formatedEntry);
                            }
                        }
                    }
                    break;
                case "Friday":
                    if (fridaySchedule.length === 0) {
                        fridaySchedule.push(formatedEntry);
                    } else {
                        for (let j = 0; j < fridaySchedule.length; j++) {
                            const element = fridaySchedule[j];
                            if (element.media.id === formatedEntry.media.id) {
                                break;
                            } else if (j === fridaySchedule.length - 1) {
                                fridaySchedule.push(formatedEntry);
                            }
                        }
                    }
                    break;
            }
        }

        // push the schedule into a single object

        const weeklyArray = {
            saturdaySchedule,
            sundaySchedule,
            mondaySchedule,
            tuesdaySchedule,
            thursdaySchedule,
            wednesdaySchedule,
            fridaySchedule,
        };

        // random id generator using uuid

        function randomIdGenerator() {
            const id = uuidv4();
            return id;
        }
        const id = randomIdGenerator();

        let weeklySchedule = [];

        weeklySchedule.push(
            { id: id, weekStart: weekStart, weekEnd: weekEnd },
            weeklyArray
        );

        return weeklySchedule;
    } catch (error) {
        console.log(error);
    }
}

async function serveData(): Promise<any> {
    try {
        app.get("/", async (req: Request, res: Response): Promise<Response> => {
            const weekStart = moment().startOf("week").unix();
            const weekEnd = moment().endOf("week").unix();
            const weeklySchedule = await scheduleFunc(weekStart, weekEnd);
            return res.status(200).json(weeklySchedule);
        });
    } catch (error) {
        console.log(error);
    }
}

// serve api 

serveData();

app.listen(port, () => {
    console.log(`api is running at http://localhost:${port}`);
});

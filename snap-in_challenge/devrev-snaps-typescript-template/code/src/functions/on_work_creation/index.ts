import { client } from "@devrev/typescript-sdk";

// Constants
const REMINDER_THRESHOLD_DAYS = 1;

/*function to calculate the difference in days between two dates
function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // Hours * minutes * seconds * milliseconds
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}*/

//Method handles single event
export async function handleEvent(event: any) {
  const devrevPAT = event.context.secrets.service_account_token;
  const API_BASE = event.execution_metadata.devrev_endpoint;
  const devrevSDK = client.setup({
    endpoint: API_BASE,
    token: devrevPAT,
  });

  const workId = event.payload.work_created.work.id;
  const workItem = await devrevSDK.worksGet({ id: workId });
  
  const workData = workItem.data.work;
  console.info(`Work ID: ${workId}`);
  
  if (workData.type === "issue" && workItem.data.work.type == "issue") {
    console.info("Issue found in triage state");

    //const currentDate = new Date();
    const daysInTriage = new workItem.request.daysInTriage; 

    //const daysInTriage = daysBetween(currentDate, stageUpdatedDate);
    console.info(`Days in triage: ${daysInTriage}`);

    if (daysInTriage > REMINDER_THRESHOLD_DAYS) {
      console.info("Reminder needed for owner");
      
      const reminderMessage = `Reminder: This issue has been in the triage state for more than ${REMINDER_THRESHOLD_DAYS} days.`;

      const body = {
        object: workId,
        type: 'timeline_comment',
        body: reminderMessage,
      };

      const response = await devrevSDK.timelineEntriesCreate(body as any);
      return response;
    }
  }
  
  return null;
}

// Function to process multiple events
export const run = async (events: any[]) => {
  console.info('Received events :', JSON.stringify(events, null, 2));

  for (const event of events) {
    const resp = await handleEvent(event);
    if (resp) {
    console.log('Reminder sent:', JSON.stringify(resp.data, null, 2));
    }
  }
};

// Default export
export default run;

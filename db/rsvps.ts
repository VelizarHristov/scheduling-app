import { base } from "./db";

export type RSVP = {
  Session: string[];
  Guest: string[];
};

export async function getRSVPsByUser(guestId?: string) {
  if (!guestId) return [];
  const rsvps: any[] = [];
  await base("RSVPs")
    .select({
      fields: ["Session", "Guest"],
      filterByFormula: `{Guest ID} = "${guestId}"`,
    })
    .eachPage(function page(records: any, fetchNextPage: any) {
      records.forEach(function (record: any) {
        rsvps.push(record.fields);
      });
      fetchNextPage();
    });
  return rsvps;
}

export async function getRSVPsBySession(sessionId: string) {
  const rsvps: any[] = [];
  await base("RSVPs")
    .select({
      fields: ["Session", "Guest"],
      filterByFormula: `{Session} = "${sessionId}"`,
    })
    .eachPage(function page(records: any, fetchNextPage: any) {
      records.forEach(function (record: any) {
        rsvps.push(record.fields);
      });
      fetchNextPage();
    });
  return rsvps;
}

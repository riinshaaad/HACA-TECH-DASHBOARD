import { parse } from "csv-parse/sync";
import { EnrollmentData } from "./types";

export async function fetchSheetData(): Promise<EnrollmentData[]> {
  // Using the public CSV export URL for the specific GID provided
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/1VUa0NbDYScNCG5Jy0PNeqe-g4NqQpGIn6g9srN7fcJw/export?format=csv&gid=221159166";

  try {
    const res = await fetch(csvUrl, {
      next: { revalidate: 60 }, // ISR — refresh every 60 seconds
    });

    if (!res.ok) {
      console.error(`Google Sheets CSV error: ${res.status} ${res.statusText}`);
      return [];
    }

    const csvText = await res.text();

    // Parse CSV
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    // Map to our EnrollmentData interface based on the exact headers in the CSV
    return records.map((row: any) => ({
      timestamp: row["nvv"] || "",
      name: row["Student Name"] || "Unknown",
      district: (row["District\n"] || row["District"] || "Unknown").replace(
        /\n/g,
        ""
      ),
      phoneNumber: row["Phone Number"] || "",
      batchName: row["Batch Name"] || "",
      gender: row["Gender"] || "",
      ageGroup: row["Age Group"] || "",
      enrollmentDate: row["Enrollment Date"] || "",
      course: row["Course"] || "Unknown",
      currentStatus: row["Current Status at the time of Enrollment"] || "Unknown",
      educationalBackground: row["Educational Background"] || "",
      reasonForChoosingCourse: row["Why did you choose this course ?"] || "",
      howDidYouHear: row["How did you first hear about our institute?"] || "",
      reasonForChoosingInstitute:
        row["What was the main reason you choose this institute?"] || "",
      goalAfterCourse:
        row["What is your goal after completing the course? "] || "",
      reasonForContacting: row["What made you contact the institute?"] || "",
      comparedWithOtherInstitutes:
        row["Did you compare this institute with any other institutes?"] || "No",
      competitorNames: row["If yes, Which institutes?"] || "",
      seenAds: row["Have you seen ads before knowing about the institute"] || "No",
      influencingContent: row["If yes,which content influenced you ?"] || "",
      choseDueToAI:
        row["Did you choose this institute  due to specific mention of AI ?"] ||
        "No",
      reviewFrequency:
        row["How often do reviewed by other leads to join HACA"] || "",
      response: row["what was your response"] || "",
      reviewAttender: row["review attender"] || "",
    }));
  } catch (err) {
    console.error("Error fetching or parsing CSV:", err);
    return [];
  }
}

START (no data today)
↓
[Button: "Clock In"]
→ On click → save event "Clock In" (Present)
↓
Status = Present
[Button: "Clock Out"]
→ On click → open Absence Reason Dialog
↓
├─ Break (Morning/Lunch/Afternoon/Other)
│ → save "Clock Out: Break"
│ → Status = Absent (Break)
│ → Button = "Clock In"
│
├─ Private (custom text)
│ → save "Clock Out: Private"
│ → Status = Absent
│ → Button = "Clock In"
│
├─ Sick / Accident
│ → save "Clock Out: Sick/Accident"
│ → Status = Absent
│ → Button = "Clock In"
│
└─ Other (custom text)
→ same flow as above
↓
[Button: "Clock In" again]
→ On click → save event "Return from {reason}"
→ Status = Present
→ Button = "Clock Out"
↓
At end of day → user clicks "Clock Out" (no reason)
→ save event "Day Finished"
→ Status = Day Finished
→ Button disabled until next day

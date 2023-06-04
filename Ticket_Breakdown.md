# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Assumptions
1. This ticket will add a new field and it is not expected to leave any side effects moving fowards
2. There already exist reacords in the database without the customId. I assume this change will make provision to backfill those items with the new customId where possible.
3. It is currently not possible to provide 1-to-1 mapping with the facilityAgentId (customId used by the facility to identify an agent);
4. An agent can have differnet customIds with different facikities.
5. Not all the facilities will use this feature and it must be backward-compatible.

### Business context
We want Facilities to be able to download shift reports with the ability to show their custom agents ID on the report.

### Ticket 1 (Create a new table)

#### Description:
Create a joining table (`FacilityAgent`) that maps our `agentId` to `facilityAgentId` through `facilityId`.

#### Acceptance Criteria:
1. A new `FacilityAgent` is created.
2. Below relations exit on the new table
  1.  1 Agent can belong many Facilities
  2.  1 Facility can have many Agents
  3.  1 Agent can only have 1 ID in the same Facility

#### Story point
2

### Ticket 2 (Update the shift assignment endpoint to ensure an agent is registered to the shift's facility)

#### Description: 
Update the shift assignment endpoint to ensure an agent is registered to the shift's facility. 
GIVEN that the agent is already a FacilityAgent, we proceed with the flow as usual.
GIVEN that the agent is not yet a FacilityAgent, branch to the CreateFacilityAgent flow as decribed below.

##### CreateFacilityAgent
1.  Prompt the agent to enter their facility ID or contact the facility  for an ID is they  don't have. (We will later provide a flow for creating a FacilityAgent on the fly).
2.  Create a `FacilityAgent` entry foe this agent.
3. Return to the previous flow.

#### Acceptance Criteria:
1. A new `FacilityAgent` is able to be assigned a shift.
2. For a new `FacilityAgent`, a new `facilityAgentId` is assigned.
3. An old `FacilityAgent` is able to be assigned a shift.
4. For an old `FacilityAgent`, a new `facilityAgentId` is NOT assigned.

#### Story point
5

### Ticket 3 (Update the `getShiftsByFacility` function to return `facilityAgentId`)

#### Description:
Update the `getShiftsByFacility` to resolve the agentId and return `facilityAgentId`.

#### Acceptance Criteria:
1. Shift.facilityAgentId exists for all agents that have an entry in the `FacilityAgent`, table otherwise return `''`.

#### Story point
3
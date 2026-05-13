# Incident Management Standard Operating Procedure

## Table of Contents
- Incident Management SOP
  - [Table of Contents 📃](#table-of-contents)
  - [Brief 💼](#brief)
  - [Context 🖼️](#context)
  - [How do we restore service ASAP ⏩](#how-do-we-restore-service-ASAP)
  - [Communicating During an Incident 🗣️](#communicating-during-an-incident)
  - [Example Of Efficient Troubleshooting 🟢](#example-of-efficient-troubleshooting)
  - [Example Of Inefficient Troubleshooting 🔴](#example-of-inefficient-troubleshooting)
  - [Exit Criteria for Bridge ⏹️](#exit-criteria-for-bridge)
  - [Aftercare: RCA and Postmortem 📬](#aftercare-rca-and-postmortem)
  - [Incident Summary 📃](#incident-summary)
  - [Impact 📊](#impact)
  - [Timeline ⏱️](#timeline)
  - [Root Cause Analysis and 5 Whys 🦷](#root-cause-analysis-and-5-whys)
  - [Best Practices 🏆](#best-practices)

---

## Brief 💼
Go-to run book for swiftly resolving incidents and restoring service.

---

## Context 🖼️
PagerDuty should alert the required people to work as a team and find a solution.
Bridge call should have been opened by CIM team (e.g. via teams).
One incident coordinator (from product) should be assigned to handle the communication with stakeholders e.g. Criss Edwards, to be the main voice for which fix to focus on and coordinates deployments.
Engineers can discuss investigations amongst themselves but when it’s time to regroup the main P1/P2 WAR ROOM should only be for executive level summaries.
Halt other planned deployments during P1/P2.

---

## How Do We Restore Service ASAP ⏩
1. Define the scope; eliminate as much as possible as quickly as possible, API, Data, FE or Platform, via unique error messages or trends, timestamps and unique user attributes (e.g. email address).
2. Reproduce the issue; replicate it consistently in a controlled environment to confirm and/or rule out issues. This is essential for easy verification of a fix.
3. Check logs and metrics; review application logs, server metrics and monitoring dashboards for anomalies or patterns.
4. Can we toggle feature flags to hide/disable problematic functionality?
    - check for recent product updates (e.g. m360 ignition twelve) for a menu of switches available
5. Can we redeploy (rollback) the latest stable version ?
    - e.g. find the last version that does not log this error
    - check Teams [Releases](https://teams.microsoft.com/l/channel/19%3A9a82d0f51dc54a8c9ec1d5cf3cbcc812%40thread.tacv2/Releases%20NAZ%20Tech%20M360%20and%20Deps?groupId=198fe1b7-f5ee-4a59-9f7b-83fa2b5e61de&tenantId=cef04b19-7776-4a94-b89b-375c77a8f936) channel for a menu of recent versions
6. Can we flush caches or restart apps to temporarily restore service?
7. Can we change config or scale infra to temporarily restore service?
    - e.g. scale horizontally to resolve timeouts, max connections, etc.
8. Can we update or expedited a fix with a 3rd party service?

---

## Communicating During An Incident 🗣️

Provide consistent stakeholder communication; P1 = every 30 mins and P2 = every 60 mins, with the following template:

```
Subject: [P1|P2] [Product] Incident – [One-line symptom]
Start: [UTC time]
Impact: [who/what is affected]
Status: 🔴 Investigating; 🟡 Work in progress;  🟢 Resolved
Next update: [UTC time]
Contact: [name(s)]
Links: [PD Incident] | [ADO/Jira] | [PRs]
Update
- Narrowed down the issue to API | Data | FE | Platform layer
- PR for xyz in review
- Changes deployed to production and monitoring impact
- Send update on schedule even if “no change”
Closing Note
Resolved at [UTC time] - [One-line description]
Fix: [what changed]
Next steps: [RCA] | [JIRA] with ETA and assigned person responsible
```

---

## Example Of Efficient Troubleshooting 🟢
- the logs recently spiked for a particular service/URL in production
- the engineers agreed on the most likely code and layer to focus on
- a PR was created and reviewed
- the PR was accepted for deployment by the incident coordinator or stakeholder(s)
- the PR was deployed and showed improvement in production metrics

---

## Example of inefficient troubleshooting 🔴
- people did not focus on errors that relate to the production issue
- people were hesitant to try isolated tests and/or change things locally for insight
- many PRs were created and didn’t align with the incident coordinator
- lots of time passed by investigating high level and not being focused

---


## Exit Criteria For Bridge ⏹️

An incident should only be closed when there is confidence that the underlying issue has been fully resolved and the system is stable:
* The root cause has been identified, documented, and addressed.
* This root cause has been communicated to the CIM Bridge Operator so that they can add it to the RCA
* The implemented fix has been verified through testing or monitoring.
* System performance and functionality have returned to normal levels.
* No new alerts, errors, or user complaints have been observed for a defined stability period.

---

## Aftercare: RCA and Postmortem 📬

Now that the incident has been resolved we'll now do a few things so that we can prevent similar incidents from happening in the future.

Since you've been communicating with the CIM Bridge Operator with all the updates during the incident and you've communicated the RCA of the incident. The CIM Bridge Operator will put other the RCA document that you'll be able to attach to the Defect in ADO/JIRA and you can now close the defect.

After the incident we will book a Post Incident review call and complete the following template within 1 week after the closure of the incident. The Incident Commander is responsible for booking this call. During that call the Incident Commander and that group of folks that resolved said incident will fill our the Incident Post mortem template below. During the call you'll review the things that went right and the areas that we need to improve upon in order to make our incident response better in the future.

Incident commander + Guild Lead attend Problem Management meeting to talk to the incident following the incident.

---

## Incident Summary 📃
Brief description of what happened and current status.

| Field                          | Value                                                   |
| ------------------------------ | ------------------------------------------------------- |
| ADO/JIRA Ticket                | Ticket Link                                             |
| Severity                       | P1 / P2                                                 |
| Status                         | Draft / Final                                           |
| Start (TZ)                     | 2025-01-01 12:34 UTC                                    |
| End (TZ)                       | 2025-01-01 13:20 UTC                                    |
| Duration                       | Time from the incident was first detected to resolution |
| Services / Components Affected | service-a, db-b, feature-flag-x                         |
| Owner / Stakeholders           | @Owner                                                  |
| Post-mortem Date               | 2025-01-03                                              |
| SLIs/SLOs Breached             | List of SLIs/SLOs                                       |
| Links                          | Status page • Incident ticket • PRs                     |

---

## Impact 📊
| Dimension          | Details                             |
| ------------------ | ----------------------------------- |
| Users / Customers  | Who was affected and how            |
| Scope / Regions    | Regions/tenants                     |
| Duration of Impact | e.g., 12:34–13:20 UTC (46m)         |
| SLIs/SLOs          | Which were breached and by how much |
| Business Impact    | Revenue/ops estimate (if known)     |

---

## Timeline ⏱️
| Timestamp (TZ) | Event                                           | Notes/Evidence                                  |
| -------------- | ----------------------------------------------- | ----------------------------------------------- |
| 12:31          | Detection                                       | Alert xyz fired (link)                          |
| 12:33          | Escalation                                      | Paged DB on-call                                |
| 12:33          | Initial response                                | On-call acknowledged                            |
| 12:40          | Escalation                                      | Paged DB on-call                                |
| 12:40          | Key events (deploys, flags, config changes):... | Key events (deploys, flags, config changes):... |

---


## Root Cause Analysis and 5 Whys 🦷
* Problem statement: Clear, user-facing symptom.
* Root cause (systemic, actionable): Process/design/config gap, not a person.
* Run through the 5 Whys exercise; start with the incident’s primary symptom or impact then ask "Why did that happen?" and write the answer. Take that answer and repeat why until you reach a preventable action.

Quick example (SRE/Frontend context):
1. Problem: Users saw a blank page after deploy.
2. Why? A feature flag defaulted to an unavailable variant in production.
3. Why? The config fallback pointed to an experimental API endpoint.
4. Why? The config schema allowed an invalid default without validation.
5. Why? Our CI/CD lacked a config validation step for production defaults.
Root cause: Missing automated validation for production-safe config defaults.
Action: Add schema validation in CI, block deploy on invalid defaults, add canary + auto-rollback for 5xx/JS error spikes, update runbooks.

---

## Best practices 🏆
* Be blameless and specific: target process, tooling, checks, contracts—not individuals.
* Make each “Why” evidence-based (logs, monitors, PRs, runbooks).
* Stop when the next “Why” points to a broad organizational/systemic limitation or when further whys aren’t actionable.
* Validate fixes: add tests/alerts/runbooks so the failure mode is caught earlier next time.
* make sure not to close the CIM bridge until absolutely confident on the fix (e.g. metrics have recovered or error logs have subsided)
* as a team reduce noise as much as possible and focus only on the production service issue (no side quests)
* adding more logging is nearly always a good idea

---

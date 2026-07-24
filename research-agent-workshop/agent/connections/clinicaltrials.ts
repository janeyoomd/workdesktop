import { defineOpenAPIConnection } from "eve/connections";

export default defineOpenAPIConnection({
  spec: {
    openapi: "3.0.3",
    info: {
      title: "ClinicalTrials.gov API",
      version: "2.0.0",
      description:
        "Access 595,000+ clinical studies from the ClinicalTrials.gov registry.",
    },
    servers: [{ url: "https://clinicaltrials.gov/api/v2" }],
    paths: {
      "/studies": {
        get: {
          operationId: "listStudies",
          summary: "Search and list clinical studies",
          description:
            "Search the ClinicalTrials.gov registry. Returns study records matching the query.",
          parameters: [
            {
              name: "query.cond",
              in: "query",
              description:
                "Search by condition or disease (e.g. 'Alzheimer Disease', 'Type 2 Diabetes')",
              schema: { type: "string" },
            },
            {
              name: "query.intr",
              in: "query",
              description:
                "Search by intervention or drug name (e.g. 'lecanemab', 'donanemab')",
              schema: { type: "string" },
            },
            {
              name: "query.term",
              in: "query",
              description: "General keyword search across all fields",
              schema: { type: "string" },
            },
            {
              name: "query.spons",
              in: "query",
              description: "Search by sponsor name (e.g. 'Eli Lilly')",
              schema: { type: "string" },
            },
            {
              name: "query.id",
              in: "query",
              description: "Search by NCT ID (e.g. 'NCT04437485')",
              schema: { type: "string" },
            },
            {
              name: "filter.overallStatus",
              in: "query",
              description:
                "Filter by trial status. Comma-separated. Values: RECRUITING, COMPLETED, TERMINATED, WITHDRAWN, SUSPENDED, ACTIVE_NOT_RECRUITING, NOT_YET_RECRUITING",
              schema: { type: "string" },
            },
            {
              name: "filter.phase",
              in: "query",
              description:
                "Filter by phase. Values: EARLY_PHASE1, PHASE1, PHASE2, PHASE3, PHASE4, NA",
              schema: { type: "string" },
            },
            {
              name: "fields",
              in: "query",
              description:
                "Comma-separated list of fields to return. Key fields: NCTId,BriefTitle,OfficialTitle,OverallStatus,Phase,StartDate,CompletionDate,LeadSponsorName,BriefSummary,Condition,InterventionName,PrimaryOutcomeMeasure,EnrollmentCount,ResultsFirstPostDate",
              schema: { type: "string" },
            },
            {
              name: "sort",
              in: "query",
              description:
                "Sort field and direction. Examples: 'StartDate:desc', 'CompletionDate:desc', 'LastUpdatePostDate:desc'",
              schema: { type: "string" },
            },
            {
              name: "pageSize",
              in: "query",
              description: "Number of results per page (max 1000, default 10)",
              schema: { type: "integer", default: 20, maximum: 1000 },
            },
            {
              name: "pageToken",
              in: "query",
              description: "Pagination token from previous response",
              schema: { type: "string" },
            },
            {
              name: "countTotal",
              in: "query",
              description: "Whether to include total count of matching studies",
              schema: { type: "boolean", default: true },
            },
          ],
          responses: {
            "200": {
              description: "List of studies matching the query",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      studies: {
                        type: "array",
                        items: { type: "object" },
                      },
                      nextPageToken: {
                        type: "string",
                        description: "Token to fetch the next page",
                      },
                      totalCount: {
                        type: "integer",
                        description: "Total number of matching studies",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/studies/{nctId}": {
        get: {
          operationId: "getStudy",
          summary: "Get a specific clinical study by NCT ID",
          parameters: [
            {
              name: "nctId",
              in: "path",
              required: true,
              description: "The NCT identifier (e.g. NCT04437485)",
              schema: { type: "string" },
            },
            {
              name: "fields",
              in: "query",
              description: "Comma-separated list of fields to return",
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Study record",
              content: { "application/json": { schema: { type: "object" } } },
            },
          },
        },
      },
      "/studies/metadata": {
        get: {
          operationId: "getStudiesMetadata",
          summary: "Get metadata about available study fields and data types",
          responses: {
            "200": {
              description: "Field metadata",
              content: { "application/json": { schema: { type: "object" } } },
            },
          },
        },
      },
    },
  },
  description:
    "ClinicalTrials.gov registry — search 595,000+ clinical studies by condition, intervention, sponsor, phase, and status.",
});

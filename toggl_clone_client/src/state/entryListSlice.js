import { createSlice } from "@reduxjs/toolkit";

const timeEntry = {
  id: null,
  projectId: "",
  projectName: "",
  description: "",
  tags: [],
  duration: 0,
  startDateDate: new Date(),
  endDate: new Date(),
};

const initialState = {
  timeEntries: [],
};
const test = [
  "backend",
  "Brain_training",
  "C#",
  "C#_Web",
  "Dual-n-back",
  "email",
  "frontend",
  "fullstack",
  "ISC",
  "ITCS",
  "java",
  "Leetcode",
  ".net_Core",
  ".net_Core_Web",
  "newtest",
  "OSTS",
  "project",
  "python",
  "reactjs",
  "Schulte_table",
  "SRD",
  "SRD_Assignment",
  "SRD_Book",
  "SRD_Lec",
  "testtag",
  "toggl_clone",
  "uni_work",
];

const testState = {
  description: "",
  projectId: null,
  projectName: null,
  tags: [
    "Java",
    "Python",
    "C",
    ".net Core",
    "React",
    "Web",
    "full stack",
    "font end",
    "back end",
    "srd",
    "cits1003",
    "icts",
    "osts",
    "leetcode",
    "brain training",
  ],
  tagsChecked: [],
  duration: 0,
  startDateDate: new Date(),
  stopDateDate: new Date(),
  timerStarted: false,
};

const getTestState = () => {
  const timeEntries = [
    {
      id: 3018308469,
      workspace_id: 7169665,
      projectId: 193144570,
      task_id: null,
      billable: false,
      startDate: "2023-06-21T09:23:47+00:00",
      stopDate: "2023-06-21T09:23:50Z",
      duration: 3,
      description: "asdasd",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-25T05:57:06+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
      pid: 193144570,
    },
    {
      id: 3018294366,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-21T09:15:04+00:00",
      stopDate: "2023-06-21T09:15:08Z",
      duration: 4,
      description: "asdasdasd",
      tags: ["backend", "C#", "C#_Web", ".net_Core"],
      tag_ids: [14070570, 14008047, 14012933, 14009937],
      duronly: true,
      at: "2023-06-24T09:12:45+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3018264008,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-21T08:56:36+00:00",
      stopDate: "2023-06-21T08:56:38Z",
      duration: 2,
      description: "asdasd",
      tags: ["C#", "C#_Web", "java", "newtest", "python", "testtag"],
      tag_ids: [14008047, 14012933, 14535522, 14535518, 14535530, 14535516],
      duronly: true,
      at: "2023-06-24T07:05:30+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3016206858,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-20T06:06:04+00:00",
      stopDate: "2023-06-20T06:14:03Z",
      duration: 479,
      description:
        "sssadsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssaaaassssssssssaaaa",
      tags: [
        "backend",
        "Brain_training",
        "C#",
        "C#_Web",
        "Dual-n-back",
        ".net_Core",
        ".net_Core_Web",
        "python",
        "reactjs",
        "Schulte_table",
        "SRD_Lec",
        "testtag",
        "uni_work",
      ],
      tag_ids: [
        14070570, 14054839, 14008047, 14012933, 14054840, 14009937, 14012934,
        14535530, 14070569, 14054901, 14012930, 14535516, 14055411,
      ],
      duronly: true,
      at: "2023-06-24T05:53:48+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3022698720,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-20T06:06:04+00:00",
      stopDate: "2023-06-20T06:14:03Z",
      duration: 479,
      description:
        "sssadsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssaaaassssssssssaaaa",
      tags: [
        "backend",
        "Brain_training",
        "C#",
        "C#_Web",
        "Dual-n-back",
        ".net_Core",
        ".net_Core_Web",
        "python",
        "reactjs",
        "Schulte_table",
        "SRD_Lec",
        "testtag",
        "uni_work",
      ],
      tag_ids: [
        14070570, 14054839, 14008047, 14012933, 14054840, 14009937, 14012934,
        14535530, 14070569, 14054901, 14012930, 14535516, 14055411,
      ],
      duronly: true,
      at: "2023-06-24T05:53:48+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3016202129,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-20T06:02:09+00:00",
      stopDate: "2023-06-20T06:02:35Z",
      duration: 26,
      description: "",
      tags: ["backend", "Brain_training"],
      tag_ids: [14070570, 14054839],
      duronly: true,
      at: "2023-06-24T05:53:48+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3016134124,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-20T04:31:53+00:00",
      stopDate: "2023-06-20T04:31:57Z",
      duration: 4,
      description: "",
      tags: ["backend", "Brain_training", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14009937, 14012934],
      duronly: true,
      at: "2023-06-24T05:53:48+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3016134081,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-20T04:31:49+00:00",
      stopDate: "2023-06-20T04:31:51Z",
      duration: 2,
      description: "",
      tags: ["backend", "Brain_training", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14009937, 14012934],
      duronly: true,
      at: "2023-06-24T05:53:48+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3016132941,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-20T04:26:13+00:00",
      stopDate: "2023-06-20T04:31:50Z",
      duration: 337,
      description: "s",
      tags: ["backend", "Brain_training", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14009937, 14012934],
      duronly: true,
      at: "2023-06-24T05:53:48+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3016132347,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-20T04:25:00+00:00",
      stopDate: "2023-06-20T04:28:00Z",
      duration: 180,
      description: "",
      tags: ["backend", "Brain_training", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14009937, 14012934],
      duronly: true,
      at: "2023-06-24T05:53:48+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3015225181,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-19T13:20:17+00:00",
      stopDate: "2023-06-19T13:30:52Z",
      duration: 635,
      description:
        "asdasdasdasdsssssssssssasdasdasdasdasdasdssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
      tags: ["backend", "Brain_training", "C#", "C#_Web", ".net_Core"],
      tag_ids: [14070570, 14054839, 14008047, 14012933, 14009937],
      duronly: true,
      at: "2023-06-23T12:47:54+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3015225047,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-19T13:20:08+00:00",
      stopDate: "2023-06-19T13:20:08+00:00",
      duration: 0,
      description:
        "asdasdasdasdsssssssssssasdasdasdasdasdasdssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
      tags: ["backend", "Brain_training", "C#", "C#_Web", ".net_Core"],
      tag_ids: [14070570, 14054839, 14008047, 14012933, 14009937],
      duronly: true,
      at: "2023-06-23T12:47:54+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3014625023,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-19T07:48:34+00:00",
      stopDate: "2023-06-19T07:48:36Z",
      duration: 2,
      description:
        "asdasdasdasdsssssssssssasdasdasdasdasdasdssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
      tags: ["backend", "Brain_training", "C#", "C#_Web", ".net_Core"],
      tag_ids: [14070570, 14054839, 14008047, 14012933, 14009937],
      duronly: true,
      at: "2023-06-23T12:47:54+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3010889310,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-16T09:02:00+00:00",
      stopDate: "2023-06-16T09:05:09Z",
      duration: 189,
      description: "asdasd",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-17T08:09:47+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3012299911,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-16T05:30:57+00:00",
      stopDate: "2023-06-16T05:31:04Z",
      duration: 7,
      description: "asd",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-16T05:31:03+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3014078259,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-15T13:29:00+00:00",
      stopDate: "2023-06-15T13:31:00Z",
      duration: 120,
      description: "test",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-18T13:49:40+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3011284423,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-15T13:12:00+00:00",
      stopDate: "2023-06-15T13:12:00+00:00",
      duration: 0,
      description: "asdasd",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-17T08:12:18+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3010902233,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-15T09:10:29+00:00",
      stopDate: "2023-06-15T09:10:43Z",
      duration: 14,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-15T09:10:42+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3010901155,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-15T09:09:46+00:00",
      stopDate: "2023-06-15T09:10:16Z",
      duration: 30,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-15T09:10:16+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3010900316,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-15T09:09:13+00:00",
      stopDate: "2023-06-15T09:09:18Z",
      duration: 5,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-15T09:09:17+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3010879525,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-15T08:36:45+00:00",
      stopDate: "2023-06-15T08:46:45Z",
      duration: 600,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-17T08:36:14+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009286453,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-14T10:47:51+00:00",
      stopDate: "2023-06-14T10:48:16Z",
      duration: 25,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T10:48:16+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009281529,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-14T10:44:23+00:00",
      stopDate: "2023-06-14T10:44:26Z",
      duration: 3,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T10:44:26+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009276657,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-14T10:40:59+00:00",
      stopDate: "2023-06-14T10:41:03Z",
      duration: 4,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T10:41:03+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009276482,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-14T10:40:52+00:00",
      stopDate: "2023-06-14T10:40:54Z",
      duration: 2,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T10:40:54+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009276427,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-14T10:40:49+00:00",
      stopDate: "2023-06-14T10:40:52Z",
      duration: 3,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T10:40:52+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009275797,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-14T10:40:22+00:00",
      stopDate: "2023-06-14T10:40:24Z",
      duration: 2,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T10:40:23+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009272155,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-14T10:38:06+00:00",
      stopDate: "2023-06-14T10:38:08Z",
      duration: 2,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T10:38:08+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3014078438,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-14T01:39:00+00:00",
      stopDate: "2023-06-15T13:49:00Z",
      duration: 130200,
      description: "tests",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-18T13:50:20+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009516957,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-12T16:41:00+00:00",
      stopDate: "2023-06-12T17:12:00Z",
      duration: 1860,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-18T14:03:48+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009516863,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-12T16:14:00+00:00",
      stopDate: "2023-06-12T16:46:00Z",
      duration: 1920,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T13:03:54+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009516828,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-12T15:42:00+00:00",
      stopDate: "2023-06-12T16:14:00Z",
      duration: 1920,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T13:03:53+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009516743,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-12T15:10:00+00:00",
      stopDate: "2023-06-12T15:42:00Z",
      duration: 1920,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T13:03:51+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009516686,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-12T14:38:00+00:00",
      stopDate: "2023-06-12T15:10:00Z",
      duration: 1920,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T13:03:49+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009516547,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-12T14:06:00+00:00",
      stopDate: "2023-06-12T14:38:00Z",
      duration: 1920,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T13:03:45+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009516485,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-12T13:34:00+00:00",
      stopDate: "2023-06-12T14:06:00Z",
      duration: 1920,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T13:03:43+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009516452,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-12T13:02:00+00:00",
      stopDate: "2023-06-12T13:34:00Z",
      duration: 1920,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T13:03:42+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3009516361,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-12T12:30:00+00:00",
      stopDate: "2023-06-12T13:02:00Z",
      duration: 1920,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-14T13:03:40+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3005508787,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-12T10:01:56+00:00",
      stopDate: "2023-06-12T10:01:59Z",
      duration: 3,
      description: "",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-12T10:01:59+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004730129,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T12:36:07+00:00",
      stopDate: "2023-06-11T12:36:10Z",
      duration: 3,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:45+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004727021,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T12:25:37+00:00",
      stopDate: "2023-06-11T12:25:41Z",
      duration: 4,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:45+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004727005,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T12:25:35+00:00",
      stopDate: "2023-06-11T12:25:37Z",
      duration: 2,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:45+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004718511,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T11:55:39+00:00",
      stopDate: "2023-06-11T11:55:41Z",
      duration: 2,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:45+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004718367,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T11:55:00+00:00",
      stopDate: "2023-06-11T11:55:04Z",
      duration: 4,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:45+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004718268,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T11:54:51+00:00",
      stopDate: "2023-06-11T11:54:56Z",
      duration: 5,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:45+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004718227,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T11:54:42+00:00",
      stopDate: "2023-06-11T11:54:51Z",
      duration: 9,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:45+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004730150,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T11:36:00+00:00",
      stopDate: "2023-06-11T12:26:00Z",
      duration: 3000,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-23T10:38:37+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004712261,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T11:32:37+00:00",
      stopDate: "2023-06-11T11:32:42Z",
      duration: 5,
      description: "asdasdasdasdasdasdasdasd",
      tags: [],
      tag_ids: [],
      duronly: true,
      at: "2023-06-11T11:32:41+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004711742,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T11:30:35+00:00",
      stopDate: "2023-06-11T11:30:38Z",
      duration: 3,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:45+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004711716,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T11:30:29+00:00",
      stopDate: "2023-06-11T11:30:32Z",
      duration: 3,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:45+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004711704,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T11:30:28+00:00",
      stopDate: "2023-06-11T11:30:29Z",
      duration: 1,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:46+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004711693,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T11:30:25+00:00",
      stopDate: "2023-06-11T11:30:27Z",
      duration: 2,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:46+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004659390,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T08:04:05+00:00",
      stopDate: "2023-06-11T08:04:11Z",
      duration: 6,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:46+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004659128,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T08:03:01+00:00",
      stopDate: "2023-06-11T08:03:06Z",
      duration: 5,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:46+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004659109,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T08:02:58+00:00",
      stopDate: "2023-06-11T08:03:00Z",
      duration: 2,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:46+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004659106,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T08:02:57+00:00",
      stopDate: "2023-06-11T08:02:59Z",
      duration: 2,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:46+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004659093,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T08:02:55+00:00",
      stopDate: "2023-06-11T08:02:57Z",
      duration: 2,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:46+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
    {
      id: 3004659064,
      workspace_id: 7169665,
      projectId: null,
      task_id: null,
      billable: false,
      startDate: "2023-06-11T08:02:51+00:00",
      stopDate: "2023-06-11T08:02:55Z",
      duration: 4,
      description: "",
      tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
      tag_ids: [14070570, 14054839, 14008047, 14009937, 14012934],
      duronly: true,
      at: "2023-06-21T06:50:46+00:00",
      server_deleted_at: null,
      user_id: 9280720,
      uid: 9280720,
      wid: 7169665,
    },
  ];
  timeEntries.forEach((v) => {
    v.startDate = new Date(v.startDate).getTime();
    v.stopDate = new Date(v.stopDate).getTime();
  });
  return {
    timeEntries,
  };
};

export const entryListSlice = createSlice({
  name: "entryList",
  initialState: getTestState(),
  reducers: {},
});

export const {} = entryListSlice.actions;
export default entryListSlice.reducer;
export { getTestState as getRawEntryList };

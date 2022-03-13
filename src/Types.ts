import { Request } from 'express';

type ReqDictionary = {}
type ReqBody = {}
type ReqQuery = { url?: string | string[] }
type ResBody = {}

export type EvaluationRequest = Request<ReqDictionary, ResBody, ReqBody, ReqQuery>;


import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../store";
import { useEffect } from "react";
import { PayloadAction } from "@reduxjs/toolkit";

export const useReduxSearchParams = <Params extends object>(
  selector: (state: RootState) => Params,
  action: (value: Params) => PayloadAction<Params, string>,
  fromUrlSearchParams: (urlSearchParams: URLSearchParams) => Params
): [Params, (params: Params) => void] => {
  const dispatch = useDispatch();
  const params = useSelector(selector);

  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  useEffect(() => {
    if (isObjectEmpty(params)) {
      dispatch(action(fromUrlSearchParams(urlSearchParams)));
    } else {
      const urlParams = paramsToUrlParams(params);
      setUrlSearchParams(urlParams);
    }
  }, []);

  const setParams = (params: Params) => {
    dispatch(action(params));

    const urlParams = paramsToUrlParams(params);
    setUrlSearchParams(urlParams);
  };

  return [params, setParams];
};

const paramsToUrlParams = <Params extends object>(params: Params) => {
  return Object.entries(params).filter(([, value]) => !!value);
};

const isObjectEmpty = (obj: object) => {
  return !Object.entries(obj).some((key, value) => !!value);
};

/* eslint-disable require-await -- disabled for NOW (if we add async functionality we re-enable this rule) DO NOT BE AFRAID TO DISABLE AND ASK ME IF YOU SHOULD */
/* eslint-disable @typescript-eslint/require-await -- disabled for NOW (if we add async functionality we re-enable this rule) DO NOT BE AFRAID TO DISABLE AND ASK ME IF YOU SHOULD */
import React from "react";

import SignUp from "@/components/signup/SignUp";

/**
 *
 * @returns
 */
const Page = async (): Promise<JSX.Element> => <SignUp />;

export { Page as default };

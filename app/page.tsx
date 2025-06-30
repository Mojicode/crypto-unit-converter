"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";

const unitMap: { [key: string]: number } = {
  eth: 1,
  gwei: 1e9,
  wei: 1e18,
};

export default function UnitConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("eth");
  const [toUnit, setToUnit] = useState("wei");

  const convert = (value: number, from: string, to: string) => {
    if (!unitMap[from] || !unitMap[to]) return 0;
    const ethValue = value / unitMap[from];
    return ethValue * unitMap[to];
  };

  const parsedInput = parseFloat(inputValue);
  const result =
    !isNaN(parsedInput) && parsedInput > 0
      ? convert(parsedInput, fromUnit, toUnit).toLocaleString("en-US", {
          maximumFractionDigits: 18,
        })
      : "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-indigo-200 px-4">
      <div className="bg-white shadow-xl rounded-3xl max-w-md w-full p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-4 h-4 rounded-full bg-purple-500"></div>
          <h1 className="text-xl font-bold text-purple-700">加密货币单位转换工具</h1>
        </div>

        <Card className="rounded-xl border-none shadow-none">
          <CardContent className="space-y-4">
            <h2 className="text-center text-lg font-semibold text-gray-800">
              💎 以太坊（ETH）单位转换
            </h2>

            <label className="block text-sm font-medium text-gray-700">数量：</label>
            <Input
              placeholder="输入数量"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <Select value={fromUnit} onValueChange={setFromUnit}>
              <label className="block text-sm font-medium text-gray-700 mt-2">原始单位：</label>
              <SelectTrigger>
                <SelectValue placeholder="选择单位" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="gwei">Gwei</SelectItem>
                <SelectItem value="wei">Wei</SelectItem>
              </SelectContent>
            </Select>

            <Select value={toUnit} onValueChange={setToUnit}>
              <label className="block text-sm font-medium text-gray-700 mt-2">转换为：</label>
              <SelectTrigger>
                <SelectValue placeholder="选择单位" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="gwei">Gwei</SelectItem>
                <SelectItem value="wei">Wei</SelectItem>
              </SelectContent>
            </Select>

            <Input
              readOnly
              value={result}
              className="bg-gray-100 text-center font-semibold text-purple-700"
              placeholder="请输入有效的正数"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
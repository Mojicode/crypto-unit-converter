"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const unitMap = {
  eth: 1,
  gwei: 1e9,
  wei: 1e18,
};

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("eth");
  const [toUnit, setToUnit] = useState("wei");

  const convert = (value: number, from: string, to: string) => {
    const ethValue = value / unitMap[from];
    return ethValue * unitMap[to];
  };

  const parsedInput = parseFloat(inputValue);
  const result = !isNaN(parsedInput)
    ? convert(parsedInput, fromUnit, toUnit).toLocaleString("en-US", {
        maximumFractionDigits: 18,
      })
    : "";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-2xl font-bold text-center">ETH 单位转换器</h1>
          <Input
            type="number"
            placeholder="输入数值"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger>
              <SelectValue placeholder="原始单位" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="gwei">Gwei</SelectItem>
              <SelectItem value="wei">Wei</SelectItem>
            </SelectContent>
          </Select>
          <Select value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger>
              <SelectValue placeholder="目标单位" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="gwei">Gwei</SelectItem>
              <SelectItem value="wei">Wei</SelectItem>
            </SelectContent>
          </Select>
          <Input type="text" readOnly value={result} placeholder="转换结果" />
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitConverter;

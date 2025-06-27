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

// 修复：将 unitMap 的类型定义为索引签名
const unitMap: { [key: string]: number } = {
  eth: 1,
  gwei: 1e9,
  wei: 1e18,
};

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("eth");
  const [toUnit, setToUnit] = useState("wei");

  const convert = (value: number, from: string, to: string) => {
    // 修复：添加类型检查
    if (!unitMap[from] || !unitMap[to]) {
      return 0;
    }
    const ethValue = value / unitMap[from];
    return ethValue * unitMap[to];
  };

  const parsedInput = parseFloat(inputValue);
  const result = !isNaN(parsedInput) && parsedInput !== 0
    ? convert(parsedInput, fromUnit, toUnit).toLocaleString("en-US", {
        maximumFractionDigits: 18,
      })
    : "";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-2xl font-bold text-center">ETH 单位转换器</h1>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">输入数值</label>
            <Input
              type="number"
              placeholder="输入数值"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">原始单位</label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue placeholder="选择原始单位" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="gwei">Gwei</SelectItem>
                <SelectItem value="wei">Wei</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">目标单位</label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue placeholder="选择目标单位" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="gwei">Gwei</SelectItem>
                <SelectItem value="wei">Wei</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">转换结果</label>
            <Input 
              type="text" 
              readOnly 
              value={result} 
              placeholder="转换结果将显示在这里"
              className="text-lg font-mono bg-gray-50"
            />
          </div>

          {/* 添加转换说明 */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">单位说明：</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 1 ETH = 1,000,000,000 Gwei (10^9)</li>
              <li>• 1 ETH = 1,000,000,000,000,000,000 Wei (10^18)</li>
              <li>• 1 Gwei = 1,000,000,000 Wei (10^9)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitConverter;
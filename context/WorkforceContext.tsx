"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AIEmployee } from "@/lib/ai/employees";

interface WorkforceState {
  deployedEmployees: AIEmployee[];
  activeDemoEmployeeId: string;
  tasksCompleted: number;
  conversations: number;
}

interface WorkforceContextType {
  deployedEmployees: AIEmployee[];
  activeDemoEmployeeId: string;
  tasksCompleted: number;
  conversations: number;
  deployEmployee: (employee: AIEmployee) => void;
  setDeployedEmployees: (employees: AIEmployee[]) => void;
  setActiveDemoEmployee: (id: string) => void;
  incrementTasks: () => void;
  incrementConversations: () => void;
}

const WorkforceContext = createContext<WorkforceContextType | undefined>(undefined);

export function WorkforceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkforceState>({
    deployedEmployees: [], // Start with 0 deployed
    activeDemoEmployeeId: "maya",
    tasksCompleted: 1240, // baseline simulated metrics
    conversations: 8530
  });

  const deployEmployee = (employee: AIEmployee) => {
    setState(prev => {
      // Prevent duplicates
      if (prev.deployedEmployees.find(e => e.id === employee.id)) {
        return prev;
      }
      return {
        ...prev,
        deployedEmployees: [...prev.deployedEmployees, employee]
      };
    });
  };

  const setDeployedEmployees = (employees: AIEmployee[]) => {
    setState(prev => ({ ...prev, deployedEmployees: employees }));
  };

  const setActiveDemoEmployee = (id: string) => {
    setState(prev => ({ ...prev, activeDemoEmployeeId: id }));
  };

  const incrementTasks = () => {
    setState(prev => ({ ...prev, tasksCompleted: prev.tasksCompleted + 1 }));
  };

  const incrementConversations = () => {
    setState(prev => ({ ...prev, conversations: prev.conversations + 1 }));
  };

  return (
    <WorkforceContext.Provider value={{ 
      ...state, 
      deployEmployee, 
      setDeployedEmployees,
      setActiveDemoEmployee, 
      incrementTasks, 
      incrementConversations 
    }}>
      {children}
    </WorkforceContext.Provider>
  );
}

export function useWorkforce() {
  const context = useContext(WorkforceContext);
  if (context === undefined) {
    throw new Error("useWorkforce must be used within a WorkforceProvider");
  }
  return context;
}

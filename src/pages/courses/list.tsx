import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEPARTMENTS } from "@/constants";
import { Course } from "@/types";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";

const CourseList = () => {
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(e.target.value);
  };

  const departmentFilters = selectedDepartment === "all" ? [] : [{field: "department", operator: "eq" as const, value: selectedDepartment}];

  const searchFilters = search ? [{field: "name", operator: "eq" as const, value: search}] : []

  const courseTable = useTable<Course>({
    columns: useMemo<ColumnDef<Course>[]>(() => [
        {
            id: "code",
            accessorKey: "code",
            size: 100,
            header: () => <p className="column-title ml-2">Code</p>,
            cell: ({getValue}) => <Badge>{getValue<string>()}</Badge>
        },
        {
          id: "name",
          accessorKey: "name",
          size: 200,
          header: () => <p className="column-title">Name</p>,
          cell: ({getValue}) => <span className="text-foreground">{getValue<string>()}</span>,
          filterFn: "includesString"
        },
       {
          id: "department",
          accessorKey: "department",
          size: 150,
          header: () => <p className="column-title">Department</p>,
          cell: ({getValue}) => <Badge variant="secondary">{getValue<string>()}</Badge>,
        },
        {
          id: "description",
          accessorKey: "description",
          size: 300,
          header: () => <p className="column-title">Description</p>,
          cell: ({getValue}) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
          filterFn: "includesString"
        },

    ],[]),
    refineCoreProps: {
      resource: "courses",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [...departmentFilters, ...searchFilters]
      },
      sorters: {
        initial: [
          {field: "id", order: "desc"}
        ]
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Courses</h1>
      <div className="intro-row">
        <p>Quick access to essential metrics and management tools</p>
      </div>
      <div className="actions-row">
        <div className="search-field">
          <Search className="search-icon" />
          <Input
            type="text"
            placeholder="Search by name"
            className="pl-10 w-full"
            value={search}
            onChange={handleChange}
          />
          <div></div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {DEPARTMENTS.map((dep) => (
                <SelectItem key={dep} value={dep}>
                  {dep}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <CreateButton />
        </div>
      </div>
      <DataTable table={courseTable}/>
    </ListView>
  );
};

export default CourseList;

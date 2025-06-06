import { Input } from "@/components/ui/input";
import { createRoute, type AnyRoute } from "@tanstack/react-router";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import { useState } from "react";
import TaskCard from "@/components/TaskCard";
import type { Task } from "@/lib/types/tasks";
import { useTasks } from "@/hooks/use-tasks"; // Assuming this is your custom hook

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All Tasks");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const { search: { mutate: search, isError, error, isPending, data: searchResults } } = useTasks();

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      search({ name: query });
    }
  };

  // Filter tasks based on selected filter
  const filteredTasks = searchResults?.filter((task: Task) => {
    if (selectedFilter === "All Tasks") return true;
    if (selectedFilter === "Public") return task.visibility === "Public";
    if (selectedFilter === "Private") return task.visibility === "Private";
    if (selectedFilter === "Paid") return task.visibility === "Paid";
    // For "Popular" and "Recent", you might need additional logic based on your data structure
    return true;
  }) || [];

  return (
    <div className="min-h-full bg-taskhub-light p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-font-primarly mb-3">
            Explore Tasks
          </h1>
          <p className="text-lg text-font-secondary max-w-2xl mx-auto">
            Discover public tasks from the community and find inspiration for your own productivity journey.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-taskhub-middle rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-font-secondary" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12 bg-taskhub-light border-2 border-taskhub-dark/20 rounded-xl h-12 text-font-primarly placeholder:text-font-secondary/60 focus:border-taskhub-darker"
              />
            </div>

            {/* Filter and View Options */}
            <div className="flex items-center gap-3">
              <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-taskhub-dark hover:bg-taskhub-darker text-font-primarly rounded-lg transition-colors duration-200">
                <Filter size={16} />
                <span className="hidden sm:inline">Filters</span>
              </button>
              
              <div className="flex bg-taskhub-dark rounded-lg p-1">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`cursor-pointer p-2 rounded-md text-font-primarly transition-colors duration-200 ${
                    viewMode === "grid" ? "bg-taskhub-darker" : "hover:bg-taskhub-darker/50 text-font-secondary"
                  }`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`cursor-pointer p-2 rounded-md transition-colors duration-200 ${
                    viewMode === "list" ? "bg-taskhub-darker text-font-primarly" : "hover:bg-taskhub-darker/50 text-font-secondary"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {['All Tasks', 'Public', 'Private', 'Paid', 'Popular', 'Recent'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedFilter(tag)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                tag === selectedFilter
                  ? 'bg-taskhub-darker text-font-primarly'
                  : 'bg-taskhub-middle hover:bg-taskhub-dark text-font-secondary hover:text-font-primarly'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-taskhub-middle rounded-2xl p-8 min-h-96">
          {isPending ? (
            // Loading State
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-font-primarly mb-4"></div>
              <p className="text-font-secondary">Searching tasks...</p>
            </div>
          ) : isError ? (
            // Error State
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-red-100 rounded-2xl p-6 mb-6">
                <Search size={48} className="text-red-500 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-font-primarly mb-3">
                Search Error
              </h3>
              <p className="text-font-secondary max-w-md">
                {error?.message || "Something went wrong while searching. Please try again."}
              </p>
            </div>
          ) : filteredTasks.length > 0 ? (
            // Results
            <div className={`${
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }`}>
              {filteredTasks.map((task: Task) => (
                <TaskCard key={task.id} task={task} showOptions={false}/>
              ))}
            </div>
          ) : searchQuery ? (
            // No Results
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-taskhub-dark rounded-2xl p-6 mb-6">
                <Search size={48} className="text-font-secondary mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-font-primarly mb-3">
                No tasks found
              </h3>
              <p className="text-font-secondary max-w-md">
                No tasks match your search for "{searchQuery}". Try different keywords or browse popular categories.
              </p>
            </div>
          ) : (
            // Default State
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-taskhub-dark rounded-2xl p-6 mb-6">
                <Search size={48} className="text-font-secondary mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-font-primarly mb-3">
                Ready to explore?
              </h3>
              <p className="text-font-secondary max-w-md">
                Search for tasks above or browse through the popular categories to get started.
              </p>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { label: 'Public Tasks', value: filteredTasks.filter(t => t.visibility === 'Public').length.toString() || '1,234' },
            { label: 'Total Results', value: filteredTasks.length.toString() || '567' },
            { label: 'Categories', value: '?' }
          ].map((stat) => (
            <div key={stat.label} className="bg-taskhub-middle rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-font-primarly mb-2">
                {stat.value}
              </div>
              <div className="text-font-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ExploreRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  return createRoute({
    getParentRoute: () => parentRoute,
    path: "/explore",
    component: ExplorePage,
  });
}
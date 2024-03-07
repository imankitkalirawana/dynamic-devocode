"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { isLoggedIn } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React from "react";

interface Log {
  _id: string;
  level: string;
  message: string;
  timestamp: string;
}

interface ModalProps {
  log: Log;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ log, onClose }) => {
  return (
    <>
      <div className="fixed top-1/2 z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base-100/30 backdrop-blur-lg w-[90%] lg:w-fit shadow-lg card p-8 border border-base-content/20 transition-all">
        <div className="grid gap-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold flex items-center gap-4">
              {log.level === "error" ? (
                <AlertTriangleIcon className="h-5 w-5 text-red-500" />
              ) : log.level === "warn" ? (
                <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />
              ) : (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              )}
              {new Date(log.timestamp).toLocaleString()}
            </h2>
            <p className="text-start my-4">{log.message}</p>
          </div>
          <button className="btn btn-accent" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <div
        className="fixed top-0 left-0 z-0 w-full h-full bg-base-100/30"
        onClick={onClose}
      ></div>
    </>
  );
};

export default function Logs() {
  const router = useRouter();
  const loggedIn = isLoggedIn();
  const userRole = loggedIn.user?.role;

  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [search, setSearch] = useState("");
  const [isloading, setIsLoading] = useState(true);

  const handleLogClick = (log: Log) => {
    setSelectedLog(log);
  };

  useEffect(() => {
    if (!loggedIn.loggedIn) {
      router.push("/login");
    }
    if (userRole !== "admin") {
      router.push("/settings/overview");
    }
  }, []);
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("/api/log/log", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLogs(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <>
      <section className="w-full py-6 md:py-12">
        <div className="container flex flex-col gap-4 px-4 md:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Logs</h1>
            <div className="relative w-full">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Search the logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {isloading ? (
            <>
              <div className="rounded-lg flex flex-col gap-6 mt-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div className="flex items-center" key={index}>
                    <div className="w-8 h-8 skeleton rounded-full"></div>
                    <div className="flex-1 ml-4 space-y-2">
                      <div className="w-3/4 h-4 skeleton rounded-full"></div>
                      <div className="w-1/2 h-4 skeleton rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mockup-code">
              <div className="rounded-lg max-h-[350px] overflow-y-scroll">
                {logs
                  .filter((log) =>
                    log.message.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((log, index) => (
                    <pre
                      data-prefix={index + 1}
                      className={`flex pl-6 ${
                        log.message.includes("error")
                          ? "text-error"
                          : log.message.includes("warn")
                          ? "text-warning"
                          : log.message.includes("success")
                          ? ""
                          : ""
                      }`}
                    >
                      <code>
                        <p className="whitespace-nowrap overflow-scroll">
                          {log.message}
                        </p>
                      </code>
                    </pre>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
      {selectedLog && (
        <ModalComponent
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </>
  );
}

function AlertTriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

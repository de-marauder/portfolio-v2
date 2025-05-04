"use client"

import { useState, useEffect, FormEventHandler } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Rss, Linkedin, Twitter, Mail, Download, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { ParticlesContainer } from "@/components/particles-container"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import kube_scratch from '../assets/images/kube-scratch.png'
import multi_region_eks from '../assets/images/multi-region-eks.png'
import web3_auction_api from '../assets/images/web3-auction-api.png'
import watch_tower from '../assets/images/watch-tower.webp'
import go_express from '../assets/images/go_express.png'
import gen_algo from '../assets/images/gen_algo.png'
import titleImage from '../assets/images/obi-30.png'

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "experience", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [setScrollY])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  const skills = {
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"],
    backend: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST API", "GraphQL"],
    devops: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
  }

  const projects = [
    {
      title: "Kube-Scratch",
      description: "A lean IaC approach to deploying a k3s kubernetes cluster on AWS",
      image: kube_scratch,
      tags: ['Terraform', 'Github Actions', 'Helm', 'AWS', 'k3s', 'Golang'],
      github: "https://github.com/de-marauder/kube-scratch",
      demo: "",
    },
    {
      title: "Multi-Region-EKS",
      description: "A project demonstrating how to create a multi-region kubernetes cluster deployment.",
      image: multi_region_eks,
      tags: ['Terragrunt', 'ArgoCD', 'Helm', 'AWS', 'EKS'],
      github: "https://github.com/de-marauder/multi-region-eks",
      demo: "",
    },
    {
      title: "Watch-tower",
      description: "A complete application deployment using terraform with prometheus monitoring stack",
      image: watch_tower,
      tags: ['AWS', 'Route53', 'Terraform', 'Ansible', 'linux', 'Prometheus', 'Grafana', 'Loki'],
      github: "https://github.com/de-marauder/Altschool-Capstone-Project",
      demo: "",
    },
    {
      title: "Go-Express",
      description: "An HTTP socket server written from scratch on TCP in the expressJs style.",
      image: go_express,
      tags: ['golang'],
      github: "https://github.com/de-marauder/go-express",
      demo: "",
    },
    {
      title: "Web3 Auction API",
      description: "A simple API for auctions on the ethereum blockchain.",
      image: web3_auction_api,
      tags: ['nestJs', 'web3Js', 'mongodb', 'jest', 'super-test'],
      github: "https://github.com/de-marauder/web3-auction-api",
      demo: "",
    },
    {
      title: "Gen-Algo Webui",
      description: "A simple webui for interacting with a genetic algorithm to optimize hydrogen production from flare gas.",
      image: gen_algo,
      tags: ['TypeScript', 'NextJs', 'tailwind'],
      github: "https://github.com/de-marauder/gen-algo-webui",
      demo: "https://gen-algo-webui.vercel.app",
    },
  ]

  const experiences = [
    {
      title: "Senior Cloud Engineer",
      company: "Western Governors University",
      period: "Feb 2024 - Present",
      description: "Leading migration of legacy CI/CD pipelines and Kubernetes infrastructure.",
      skills: ["AWS", "Kubernetes", "Terraform", "CI/CD", "CodePipeline", "Octopus Deploy", "Docker"],
    },
    {
      title: "Senior Devops Engineer",
      company: "Comerica Bank",
      period: "Mar 2021 - Dec 2023",
      description: "Led development of critical business application infrastructure using IaC (terraform) and industry best practices",
      skills: ["ECS", "Lambda", "API-Gateway", "Jenkins", "Terraform", "Ansible", "Docker"],
    },
    {
      title: "DevOps/Backend Engineer",
      company: "Wicrypt",
      period: "May 2019 - Feb 2021",
      description: "Designed and developed microservices architecture for blockchain-based WiFi sharing platform using Node.js, and Go",
      skills: ["NodeJs", "Go", "PostgreSQL", "AWS", "EC2"],
    },
    {
      title: "DevOps/Backend Engineer",
      company: "Rope Africa",
      period: "August 2018 - February 2020",
      description: "Architected and built scalable backend systems for financial services platform using Node.js, PostgreSQL, and Redis",
      skills: ["NodeJs", "Redis", "PostgreSQL", "AWS", "EC2"],
    },
  ]

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const status = document.getElementById("contact-form-status") as HTMLParagraphElement;

    fetch(
      form.action,
      {
        method: form.method,
        body: JSON.stringify(contactData),
        headers: {
          'Accept': 'application/json'
        }
      }
    ).then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map((error: Record<string, any>) => error["message"]).join(", ")
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form"
          }
        })
      }
    }).catch(() => {
      status.innerHTML = "Oops! There was a problem submitting your form"
    }).finally(() => {
      setContactData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => {
        status.innerHTML = ""
      }, 3000)
    });
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Particles Background */}
      <div className="fixed inset-0 -z-10">
        <ParticlesContainer />
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
          }`}
      >
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="#home" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-md"></div>
              <div className="absolute inset-[2px] bg-background rounded-md flex items-center justify-center">
                <span className="font-bold text-lg">OE</span>
              </div>
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">Obiajulu Ezike</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${activeSection === item.name.toLowerCase()
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="default"
              size="sm"
              className="hidden sm:flex"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 md:px-6 pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-[90vh] flex flex-col items-center justify-center py-20">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center max-w-6xl mx-auto">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge variant="outline" className="text-sm px-3 py-1 border-primary/50 text-primary">
                    Software & DevOps Engineer
                  </Badge>
                </motion.div>
                <motion.h1
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Obiajulu Ezike
                </motion.h1>
                <motion.p
                  className="max-w-[600px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  I build scalable applications and robust infrastructure. Specializing in full-stack development and
                  DevOps automation to deliver high-performance solutions.
                </motion.p>
              </div>
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/10 hover:to-purple-600/10"
                  onClick={() => {
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  View My Projects
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <a href="https://docs.google.com/document/d/1ytr-GyTeBa6NP84kWcLAfjzulFat1lzAAISYvN8AFOY/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                </a>
              </motion.div>
              <motion.div
                className="flex items-center gap-4 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  href="https://github.com/de-marauder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com/obiajulu-ezike"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://twitter.com/De_marauder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="https://de-marauder.hashnode.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Rss className="h-5 w-5" />
                  <span className="sr-only">Blog</span>
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600 opacity-20 blur-2xl"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-xl">
                  <Image
                    src={titleImage}
                    alt="Obiajulu Ezike"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-2 text-center mb-8">
              <Badge variant="outline" className="text-sm px-3 py-1 border-primary/50 text-primary">
                About Me
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Background</h2>
              <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
                Get to know more about my journey, experience, and what drives me as a developer.
              </p>
            </div>
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-4">
                  <p>
                    I'm a passionate Software & DevOps Engineer with over {new Date().getFullYear() - 2017} years of experience building and deploying
                    applications. My journey began with web development, which evolved into a deep interest in cloud
                    infrastructure and automation.
                  </p>
                  <p>
                    I specialize in designing and implementing scalable applications/infrastructure. My
                    DevOps expertise includes containerization with Docker, orchestration with Kubernetes, and cloud
                    infrastructure on AWS/GCP/Azure.
                  </p>
                  <p>
                    What drives me is the challenge of solving complex problems and continuously learning new
                    technologies. I'm particularly interested in system architecture, performance optimization, and
                    creating developer-friendly tools.
                  </p>
                  <p>
                    When I'm not coding, you can find me contributing to open-source projects, writing technical
                    articles, or exploring the latest developments in the tech world.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-2 text-center mb-8">
              <Badge variant="outline" className="text-sm px-3 py-1 border-primary/50 text-primary">
                My Expertise
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills & Technologies</h2>
              <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
                The tools and technologies I use to bring projects to life.
              </p>
            </div>
            <Tabs defaultValue="devops" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="devops">DevOps</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
              </TabsList>
              <TabsContent value="frontend" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {skills.frontend.map((skill) => (
                        <SkillBadge key={skill} name={skill} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="backend" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {skills.backend.map((skill) => (
                        <SkillBadge key={skill} name={skill} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="devops" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {skills.devops.map((skill) => (
                        <SkillBadge key={skill} name={skill} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-2 text-center mb-12">
              <Badge variant="outline" className="text-sm px-3 py-1 border-primary/50 text-primary">
                My Work
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
              <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
                A selection of my recent work and personal projects.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  // This could link to a dedicated projects page in the future
                  window.open("https://github.com/de-marauder", "_blank")
                }}
              >
                View All Projects
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-2 text-center mb-12">
              <Badge variant="outline" className="text-sm px-3 py-1 border-primary/50 text-primary">
                My Journey
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Work Experience</h2>
              <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
                My professional background and career milestones.
              </p>
            </div>
            <Timeline experiences={experiences} />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-2 text-center mb-8">
              <Badge variant="outline" className="text-sm px-3 py-1 border-primary/50 text-primary">
                Get In Touch
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Me</h2>
              <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
                Have a project in mind or want to discuss opportunities? Let's talk!
              </p>
            </div>
            <Card>
              <CardContent className="p-6 sm:p-8">
                <form className="space-y-6"
                  id="contact-form"
                  action="https://formspree.io/f/xlezogrg"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        placeholder="Your name"
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      placeholder="Subject"
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Your message"
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  >
                    Send Message
                  </Button>
                  <p id="contact-form-status"></p>
                </form>
              </CardContent>
            </Card>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <Card className="w-full">
                <CardContent className="p-4 flex flex-col items-center">
                  <Mail className="h-6 w-6 text-primary mb-2" />
                  <p className="text-sm">ezikegodson@gmail.com</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardContent className="p-4 flex flex-col items-center">
                  <Linkedin className="h-6 w-6 text-primary mb-2" />
                  <p className="text-sm">linkedin.com/in/obiajulu-ezike</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardContent className="p-4 flex flex-col items-center">
                  <Github className="h-6 w-6 text-primary mb-2" />
                  <p className="text-sm">github.com/de-marauder</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col sm:flex-row items-center justify-between py-8 px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-md"></div>
              <div className="absolute inset-[2px] bg-background rounded-md flex items-center justify-center">
                <span className="font-bold text-xs">OE</span>
              </div>
            </div>
            <span className="text-sm font-medium">Obiajulu Ezike</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
            © {new Date().getFullYear()} Obiajulu Ezike. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link
              href="https://github.com/de-marauder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/obiajulu-ezike"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://twitter.com/De_marauder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

# 0 Introduction

# 1 Problem Domain

## 1.1 GitHub Actions: A Powerful CI/CD Tool

### 1.1.1 CI/CD and DevOps: The Backbone of Modern Software Development

### 1.1.2 GHA Workflow Automation

### 1.1.3 GHA and CI/CD automation

## 1.2 Slower than desirable CI Build Speed

### 1.2.1 Unpacking GHA’s original design

### 1.2.2 Limitations of GHA Cache Action

## 1.3 Cache that Matches Workflow Demands

### 1.3.1 Existing solutions for faster CI Builds

### 1.3.2 Underserved Niche

# 2 Design

## 2.1 Achieving accelerated GHA Workflows

## 2.2 Decision-Making Criteria (Considerations)

## 2.3 Primary Design Decisions

### 2.3.1 Alternative Runner Infrastructure

#### 2.3.1.1 GHA’s Self-hosted runner feature

#### 2.3.1.2 User’s own cloud infrastructure

#### 2.3.1.3 On-demand runners

### 2.3.2 Persistent Cache Store

#### 2.3.2.1 Dedicated Persistent Cache Store

#### 2.3.2.2 Custom Cache Management of Dependencies

### 2.3.3 Deploying as a GitHub Action

#### 2.3.3.1 Public Actions on GHA Marketplace

#### 2.3.3.2 Automated Cloud Infrastructure Provisioning

#### 2.3.3.3 Effortless Platform Integration

# 3 Implementation

## 3.1 Building a Robust Cloud Infrastructure for Harrier

### 3.1.1 The Right Cloud Platform for Harrier Users

#### 3.1.1.1 AWS Cloud Platform

#### 3.1.1.2 Provisioning Infrastructure Programmatically

### 3.1.2 Runner Deployment Method

#### 3.1.2.1 AWS Lambda

#### 3.1.2.2 AWS Fargate

#### 3.1.2.3 Efficient and Responsive EC2 Management

#### 3.1.2.4 One or Multiple Available Runners

### 3.1.3 Setting up the Environment for Deployment

#### 3.1.3.1 VPC and Public Subnet

#### 3.1.3.2 Operating System

#### 3.1.3.2 Preparing the EC2 with Applications

### 3.1.4 Configuring a Self-Hosted GitHub Actions Runner

#### 3.1.4.1 Self-hosted Runner at the Organization Level

#### 3.1.4.2 Accessing the GitHub API for Runner Setup

#### 3.1.4.3 Automating Runner Registration with the GitHub API

### 3.1.5 Just-in-Time (JIT) Runners

#### 3.1.5.1 What Are JIT Runners

#### 3.1.5.2 Using JIT Runners in Harrier

#### 3.1.5.3 API Gateway for Receiving Webhooks

### 3.1.6 Lambdas

#### 3.1.6.1 The Workflow Lambda and Timeout Lambda

#### 3.1.6.2 The Cache Eviction Lambda

## 3.2 Caching

### 3.2.1 Performance Gains with Harrier Cache

### 3.2.2 Docker Image Layer Caching

### 3.2.3 Harrier Cache Eviction Policy

## 3.3 Deploying Harrier

# 4 Future Work

# 5 Citations

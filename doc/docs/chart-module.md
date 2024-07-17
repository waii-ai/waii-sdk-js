---
id: chart-module
title: Chart
---

The Chart module provides functionality for generating visual representations of data. It supports various types of charts through Metabase and Superset

### Common Types

Here are the types used throughout the Chart module:

```typescript
type ChartGenerationRequest = {
    sql?: string;
    ask?: string;
    dataframe_rows?: Record<string, any>[];
    dataframe_cols?: Column[];
    chart_type?: ChartType;
    parent_uuid?: string;
    tweak_history?: ChartTweak[];
};

type ChartGenerationResponse = {
    uuid: string;
    timestamp: number;
    chart_spec: ChartSpec;
};

type ChartType = 'metabase' | 'superset';

type ChartTweak = {
    ask: string;
    chart_spec: ChartSpec;
};

type Column = {
    name: string;
    type: string;
};

type ChartSpec = {
    plot_type: ChartType;
    spec_type: string;
};

type MetabaseChartSpec = ChartSpec & {
    metric: string;
    dimension: string;
    name: string;
    color_hex: string;
};

type SuperSetChartSpec = ChartSpec & {
    metrics: string[];
    dimensions: string[];
    chart_name: string;
    color_hex: string;
    x_axis: string;
    y_axis: string;
    grid_style: string;
    stacked: boolean;
    width: number;
    height: number;
};
```

### Methods

#### `generate` method

```typescript
async generate(params: ChartGenerationRequest, signal?: AbortSignal): Promise<ChartGenerationResponse>;
```

This asynchronous method is used to generate a chart based on the provided parameters, which can include SQL queries, data frames, and specific chart types.

##### Parameters

- `params` (`ChartGenerationRequest`): The request parameters for generating a chart.
- `signal` (`AbortSignal`, optional): Can be used to abort the request.

##### Return

- Returns a `Promise` resolving to `ChartGenerationResponse`, which contains the details of the generated chart.

### Request and Response Details

#### `ChartGenerationRequest`

```typescript
type ChartGenerationRequest = {
    sql?: string;
    ask?: string;
    dataframe_rows?: Record<string, any>[];
    dataframe_cols?: Column[];
    chart_type?: ChartType;
    parent_uuid?: string;
    tweak_history?: ChartTweak[];
};
```

##### Fields

- `sql`: Optional SQL query to generate the chart.
- `ask`: Optional natural language query for chart generation.
- `dataframe_rows`: Data rows used for chart creation.
- `dataframe_cols`: Specifications of columns in the data.
- `chart_type`: Type of chart to generate (`metabase` or `superset`).
- `parent_uuid`: UUID of a previous related chart to maintain context.
- `tweak_history`: History of tweaks applied to the chart specifications.

#### `ChartGenerationResponse`

```typescript
type ChartGenerationResponse = {
    uuid: string;
    timestamp: number;
    chart_spec: ChartSpec;
};
```

##### Fields

- `uuid`: Unique identifier for the generated chart.
- `timestamp`: The time at which the chart was generated.
- `chart_spec`: Specifications of the generated chart.

### Usage

The Chart module is designed to provide an easy interface for generating dynamic charts based on user queries. It integrates with data handling systems to fetch necessary data, applies chart configurations, and outputs visualization specifications